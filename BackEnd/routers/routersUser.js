const express = require("express");
const router = express.Router();
const QuestionTable = require("../models/QuestionTable");
const Question = require("../models/Question");
const QuestionTable_Question = require("../models/QuestionTable_Question");
const QuestionChoices = require("../models/QuestionChoices");
const Subject = require("../models/Subject");
const User = require("../models/User");
const AnswerRecord = require("../models/AnswerRecord");
const UserRole = require("../models/UserRole");
const MultiChoices = require("../models/MultiChoices");
const MultiChoices_Choices = require("../models/MultiChoices_Choices");
const Work_Type = require("../models/Work_Type");
const Campaign = require("../models/Campaign");
const Campaign_Subject = require("../models/Campaign_Subject");
const Group_Candidates = require("../models/Group_Candidates");
const Level = require("../models/Level");
const Interview = require("../models/Interview");
const Company = require("../models/Company");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Education = require("../models/Education");
const Skills = require("../models/Skills");
const Employment = require("../models/Employment");
const jwt = require("jsonwebtoken");
const db = require("../database");

const cloudinary = require("./cloudinary");
router.put("/api/upload_avatar_image", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      let url = "";
      await cloudinary.uploader.upload(
        req.body.file,
        (options = { format: "png" }),
        (err, result) => {
          url = result.url;
        }
      );
      User.update(
        { avatar: url },
        {
          where: {
            id: authData.user_id,
          },
        }
      )
        .then((data) => res.send({ avatar: url }))
        .catch((err) => sendStatus(404));
    }
  })
);
//get collected candidate
router.get("/api/get_collected_candidate", async (req, res) => {
  User.findAll({
    where: {
      type: 1,
    },
    include: [Education, Subject, Employment],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
//filter_candidate
router.post("/api/filter_candidate", async (req, res) => {
  let { skills, degree, positions } = req.body;
  let skillsQuery = "";
  let positionsQuery = "";
  let degreesQuery = "";
  if (skills.length) {
    skillsQuery = `and skills.subject_id=${skills[0]} `;
    for (let i = 1; i < skills.length; i++)
      skillsQuery += `or skills.subject_id=${skills[i]} `;
  }
  //
  if (positions.length) {
    positionsQuery = `and employment.position=${positions[0]} `;
    for (let i = 1; i < positions.length; i++)
      positionsQuery += `or employment.position=${positions[i]} `;
  }
  //
  if (degree !== null) degreesQuery = `and education.degree=${degree} `;

  let listUserID = await db
    .query(
      `Select user.id from user join education on user.education_id=education.id join employment  on user.id=employment.user_id join skills  on user.id=skills.user_id join subject  on skills.subject_id=subject.id 
      where user.type=1 ${skillsQuery} ${positionsQuery} ${degreesQuery}`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    )
    .then((user) => {
      let listID = [];
      //get list id: [1,2,3]
      for (let i = 0; i < user.length; i++) listID.push(user[i].id);
      return listID;
    });
  User.findAll({
    where: {
      id: { [Op.in]: listUserID },
    },
    include: [Education, Subject, Employment],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
//user send Form CV to Web
router.post("/api/create_collection_candidate", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", async (err, authData) => {
    for (let i = 0; i < req.body.skills.length; i++)
      req.body.skills[i].user_id = authData.user_id;
    for (let i = 0; i < req.body.employments.length; i++)
      req.body.employments[i].user_id = authData.user_id;
    await Skills.bulkCreate(req.body.skills);
    await Employment.bulkCreate(req.body.employments);
    let education = await Education.create(req.body.education).then(
      (education) => {
        return education;
      }
    );
    req.body.user.education_id = education.id;
    User.update(
      { ...req.body.user, type: 1 },
      {
        where: {
          id: authData.user_id,
        },
      }
    ).then(res.sendStatus(200));
  });
});
// find all the number of attempt that user do quiz in page PreGame
router.post("/api/quiz_attempt", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    AnswerRecord.max("id", {
      where: {
        user_id: authData.user_id,
        question_table_id: req.body.question_table_id,
      },
    })
      .then(async (length) => {
        let attemptArr = async (i) => {
          let attempt = await AnswerRecord.findAll({
            where: {
              id: i,
              user_id: authData.user_id,
              question_table_id: req.body.question_table_id,
            },
            include: [
              {
                model: Question,
                include: QuestionChoices,
              },
              QuestionChoices,
              {
                model: MultiChoices,
                include: QuestionChoices,
              },
            ],
          });
          return attempt;
        };
        let getArr = async () => {
          let dataArr = [];
          for (let i = 1; i <= length; i++) {
            await attemptArr(i).then((attempt) => {
              dataArr.push(attempt);
            });
          }
          return dataArr;
        };
        getArr().then((data) => res.send(data));
      })
      .catch((err) => console.log(err));
  });
});
// signup_user
router.post("/api/signup_user", (req, res) =>
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user !== null)
      res.send({ type: "error", message: "email have already used !" });
    else {
      User.create(req.body).then((data) => {
        jwt.sign({ user_id: data.id }, "hoangtri", function (err, token) {
          if (err) res.sendStatus(403);
          res.send({
            type: "success",
            message: "Sign Up Successfully !",
            data,
            token: token,
          });
        });
      });
    }
  })
);
//login check email password
router.post("/api/login_user", (req, res) =>
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((user) => {
    if (user === null) res.sendStatus(403);
    else {
      jwt.sign({ user_id: user.id }, "hoangtri", function (err, token) {
        if (err) res.sendStatus(403);
        res.send({ data: user, token: token });
      });
    }
  })
);
router.post("/api/get_user", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      User.findOne({
        where: {
          id: authData.user_id,
        },
        include: [Company, Subject, Employment, Education],
      })
        .then((data) => {
          if (data === null) res.sendStatus(403);
          else res.send(data);
        })

        .catch((err) => console.log(err));
    }
  })
);
router.post("/api/get_attempt_length", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    AnswerRecord.max("id", {
      where: {
        user_id: authData.user_id,
        question_table_id: req.body.question_table_id,
      },
    }).then((attempt_length) => {
      res.send({ attempt_length });
    });
  });
});

// record all answer that user do quiz, and then send the correct answer to client(DoQuiz page)
router.post("/api/user_answer", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      let recordAnswer = async () => {
        req.body.user_id = authData.user_id;
        let { question_choices } = req.body.multi_choice;
        if (req.body.type !== 2) await AnswerRecord.create(req.body);
        else {
          //unattempt Multi
          if (!question_choices.length) {
            await AnswerRecord.create(req.body);
          } else
            await MultiChoices.create(req.body.multi_choice).then(
              (multiData) => {
                req.body.multi_choice_id = multiData.id;
                let data = [];
                let { question_choices } = req.body.multi_choice;
                for (let j = 0; j < question_choices.length; j++)
                  data.push({
                    multi_choice_id: multiData.id,
                    choice_id: question_choices[j].id,
                  });
                MultiChoices_Choices.bulkCreate(data).then(() =>
                  AnswerRecord.create(req.body)
                );
              }
            );
        }
      };
      await recordAnswer().then(() => {
        // res.send({
        //   id: req.body.id,
        //   question_table_id: req.body.question_table_id,
        // });
        res.sendStatus(200);
      });
    }
  });
});

//get
router.post("/api/attempt_record", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findAll({
        include: [
          {
            model: QuestionChoices,
            attributes: ["is_right", "id"],
          },
          {
            model: Question,
            include: [QuestionChoices],
          },
          {
            model: MultiChoices,
            include: QuestionChoices,
          },
        ],
        where: {
          id: req.body.attempt_id,
          user_id: authData.user_id,
          question_table_id: req.body.question_table_id,
        },
      })
        .then((data) => res.send(data))

        .catch((err) => console.log(err));
    }
  });
});

router.post("/api/get_current_record_answer", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findAll({
        include: [
          {
            model: QuestionChoices,
            attributes: ["is_right", "id"],
          },
          {
            model: Question,
            include: [QuestionChoices],
          },
          {
            model: MultiChoices,
            include: QuestionChoices,
          },
        ],
        where: {
          id: req.body.attempt_id,
          user_id: authData.user_id,
          question_table_id: req.body.question_table_id,
        },
      })
        .then((data) => res.send(data))

        .catch((err) => console.log(err));
    }
  });
});
//check if user do the table before
router.post("/api/is_user_did_table", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findOne({
        where: {
          user_id: authData.user_id,
          question_table_id: req.body.question_table_id,
        },
      })
        .then((data) => {
          if (data === null) res.send(false);
          else res.send(true);
        })
        .catch((err) => console.log(err));
    }
  })
);

router.post("/api/report", verifyToken, async (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      Campaign.findAll({
        include: [
          {
            model: User,
            attributes: ["name", "email", "phone", "role_id"],
          },
          {
            model: Interview,
            where: {
              user_id: authData.user_id,
              status: 1,
            },
          },
          {
            model: QuestionTable,
          },
        ],
      })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    }
  })
);
//get quizz that user do before
router.post("/api/get_completed_table", verifyToken, async (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      AnswerRecord.findAll({
        where: {
          user_id: authData.user_id,
        },
        attributes: [
          Sequelize.fn("DISTINCT", Sequelize.col("question_table_id")),
          "question_table_id",
        ],
      })
        .then((idTableArr) => {
          let data = [];
          if (idTableArr.length === 0) res.send(data);
          else {
            let getData = async (idTableArr) => {
              let data = await QuestionTable.findOne({
                where: { id: idTableArr.question_table_id },
                include: [
                  {
                    model: Question,
                    attributes: ["id"],
                  },
                  {
                    model: AnswerRecord,
                    include: [
                      {
                        model: QuestionChoices,
                        attributes: ["is_right", "id"],
                      },
                      {
                        model: Question,
                        include: [QuestionChoices],
                      },
                      {
                        model: MultiChoices,
                        include: QuestionChoices,
                      },
                    ],
                    where: {
                      user_id: authData.user_id,
                    },
                  },
                  {
                    model: User,

                    attributes: ["name"],
                  },
                ],
                attributes: ["id", "title", "image", "played", "admin"],
              });
              return data;
            };
            let getDataArr = async () => {
              let dataArr = [];
              for (let i = 0; i < idTableArr.length; i++) {
                await getData(idTableArr[i]).then((dataTable) => {
                  dataArr.push(dataTable);
                  //if (i === idTableArr.length - 1) res.send(data);
                });
              }
              return dataArr;
            };
            getDataArr().then((data) => res.send(data));
          }
        })
        .catch((err) => console.log(err));
    }
  })
);
//show question table created by user
router.post("/api/get_user_question_table", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      User.findAll({
        where: {
          id: authData.user_id,
        },
        include: [
          {
            model: QuestionTable,
            include: [
              {
                model: Question,
                include: QuestionChoices,
              },
              {
                model: User,

                attributes: ["name"],
              },
              // Subject,
            ],
          },
        ],
      })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    }
  })
);

router.post("/api/user", (req, res) => {
  User.create(req.body)
    .then((data) => {
      res.send({
        mess: "Create User Successfully",
        data,
      });
    })
    .catch((err) => console.log(err));
});

router.put("/api/update_user", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      User.update(req.body, {
        where: {
          id: authData.user_id,
        },
      })
        .then((data) => res.send(req.body))
        .catch((err) => sendStatus(404));
    }
  })
);
function verifyToken(req, res, next) {
  const header = req.headers["user-token"];
  if (typeof header !== "undefined") {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}

router.delete("/api/user/:id", (req, res) => {});

module.exports = router;
