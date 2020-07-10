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
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../database");

const jwt = require("jsonwebtoken");
const cloudinary = require("./cloudinary");

const data = {
  question: "what is dota",
  time: 20,
  question_choices: {
    question_id: 1,
    answer: "aaa",
    is_right: 1,
  },
  question_table_id: 1,
};
router.post("/api/teleport", async (req, res) => {
  //set string become an array
  let arr = req.body.search.split(" ");
  for (let i = 0; i < arr.length; i++)
    if (arr[i] === "") {
      arr.splice(i, 1);
      i--;
    }
  let query = `quiz.title LIKE CONCAT('%', '${arr[0]}' , '%')`;
  for (let i = 1; i < arr.length; i++)
    query += ` or quiz.title LIKE CONCAT('%', '${arr[i]}' , '%')`;

  let search_quiz = () =>
    db
      .query(`Select quiz.id from question_table as quiz where ${query}`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((quiz) => {
        let listID = [];
        //get list id: [1,2,3]
        for (let i = 0; i < quiz.length; i++) listID.push(quiz[i].id);
        return listID;
      });
  let listQuiz = await search_quiz();

  QuestionTable.findAll({
    where: {
      id: { [Op.in]: listQuiz },
      is_public: 1,
      is_finish: 1,
    },
    include: [
      {
        model: Question,
        include: QuestionChoices,
      },
      { model: User, attributes: ["name"] },
      {
        model: Campaign,
        include: [Subject, Level],
        attributes: ["id"],
      },
    ],
    attributes: ["id", "title", "grade_begin", "grade_end", "image"],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
//get QuestionTable list
router.get("/api/questiontable", (req, res) =>
  QuestionTable.findAll()
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
);
router.get("/api/questiontable/:id", (req, res) => {
  QuestionTable.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Question,
        include: QuestionChoices,
      },
      {
        model: User,

        attributes: ["name"],
      },
      {
        model: Campaign,
        include: [Subject],
        attributes: ["id"],
      },
      // Subject
    ],
  }).then((data) => {
    res.send(data);
  });
});
getRandomNumber = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    var r = Math.floor(Math.random() * 10);
    code = `${code}${r}`;
  }
  return code;
};
router.post("/api/genarate_code", async (req, res) => {
  while (true) {
    let code = getRandomNumber();
    let count = async () => {
      let a = 0;
      await QuestionTable.count({ where: { code: code } })
        .then((count) => {
          if (count === 0) {
            a = 1;
          }
        })
        .catch((err) => console.log(err));
      return a;
    };
    let check = 0;
    await count().then((a) => (check = a));
    if (check) {
      QuestionTable.update(
        { code: code, ...req.body },
        { where: { id: req.body.id } }
      )
        .then(() => {
          res.redirect(`/api/questiontable/${req.body.id}`);
        })
        .catch((err) => console.log(err));
      break;
    }
  }
});
router.put("/api/table_update", async (req, res) => {
  if (req.body.isUpdateImage !== undefined && req.body.isUpdateImage)
    await cloudinary.uploader.upload(
      req.body.image,
      (options = { format: "png" }),
      (err, result) => {
        req.body.image = result.url;
      }
    );
  QuestionTable.update(req.body, { where: { id: req.body.id } })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
router.put("/api/table_update_played", (req, res) => {
  QuestionTable.findOne({
    where: {
      id: req.body.id,
    },
    attributes: ["played"],
  }).then((table) => {
    let newPlayed = table.played + 1;
    QuestionTable.update({ played: newPlayed }, { where: { id: req.body.id } })
      .then((data) => res.send(data))
      .catch((err) => console.log(err));
  });
});
router.post("/api/questiontable", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.admin = authData.user_id;
      QuestionTable.create(req.body)
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    }
  });
});
router.post("/api/get_question_table_by_subject", (req, res) => {
  Subject.findAll({
    limit: 200,
    subQuery: false,
    include: [
      {
        model: Campaign,
        include: [
          {
            model: QuestionTable,
            include: [
              {
                model: Question,
                attributes: ["id", "question"],
              },
              {
                model: User,
                attributes: ["name"],
              },
            ],
            where: { is_public: 1 || true },
          },
        ],
        attributes: ["id"],
        // limit: 5,
        // subQuery: false,
      },
    ],
    order: Sequelize.literal("rand()"),
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
router.post("/api/get_question_table_code", (req, res) => {
  QuestionTable.findOne({
    where: {
      code: req.body.code,
    },
    include: [Question, User],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
function verifyToken(req, res, next) {
  const header = req.headers["user-token"];
  if (typeof header !== "undefined") {
    req.token = header;
    next();
  } else {
    res.sendStatus(403);
  }
}
router.put("/api/questiontable", (req, res) =>
  QuestionTable.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then(res.send("success " + JSON.stringify(req.body)))
    .catch((err) => console.log(err))
);
router.delete("/api/questiontable/:id", (req, res) =>
  QuestionTable.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(res.send("success"))
    .catch((err) => console.log(err))
);
//////////////get list subject
router.get("/api/subject", (req, res) =>
  Subject.findAll()
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
);
module.exports = router;
