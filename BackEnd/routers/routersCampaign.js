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
const db = require("../database");
const cloudinary = require("./cloudinary");

const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

///////////////////////////////////////////

router.get("/api/campaign", (req, res) =>
  Campaign.findAll({
    include: [{ model: User, attributes: ["name", "email", "phone"] }, Subject],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
);
router.post("/api/search_campaign", async (req, res) => {
  //set string become an array
  let arr = req.body.search.split(" ");
  for (let i = 0; i < arr.length; i++)
    if (arr[i] === "") {
      arr.splice(i, 1);
      i--;
    }
  let query = `campaign.title LIKE CONCAT('%', '${arr[0]}' , '%')`;
  for (let i = 1; i < arr.length; i++)
    query += ` or campaign.title LIKE CONCAT('%', '${arr[i]}' , '%')`;

  let search_campaign = () =>
    db
      .query(`Select campaign.id from campaign where ${query}`, {
        type: Sequelize.QueryTypes.SELECT,
      })
      .then((campaign) => {
        let listID = [];
        //get list id: [1,2,3]
        for (let i = 0; i < campaign.length; i++) listID.push(campaign[i].id);
        return listID;
      });
  let listCampaign = await search_campaign();

  Campaign.findAll({
    where: {
      id: { [Op.in]: listCampaign },
    },
    include: [
      { model: User, attributes: ["name", "email", "phone"], include: Company },
      Subject,
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
router.post("/api/campaign_of_interviewer", verifyToken, (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      Campaign.findAll({
        include: [
          { model: User, attributes: ["name", "email", "phone", "role_id"] },
          Subject,
          Work_Type,
          Level,

          {
            model: QuestionTable,
            attributes: ["bench_mark"],
          },
          {
            model: Interview,
            where: {
              user_id: authData.user_id,
            },
          },
        ],
      })
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    }
  })
);

router.post("/api/create_campaign", verifyToken, async (req, res) =>
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.user_id = authData.user_id;
      Campaign.create(req.body)
        .then(async (data) => {
          for (let i = 0; i < req.body.subjects.length; i++) {
            req.body.subjects[i].subject_id = req.body.subjects[i].id;
            req.body.subjects[i].campaign_id = data.id;
          }
          let createCampaignSubject = () =>
            Campaign_Subject.bulkCreate(req.body.subjects).then((camp_sub) => {
              return camp_sub;
            });
          let camp_sub = await createCampaignSubject();
          Campaign.findOne({
            where: {
              id: camp_sub[0].campaign_id,
            },
            include: [
              { model: User, attributes: ["name", "email", "phone"] },
              Subject,
              Work_Type,
              Level,
            ],
          })
            .then((campaign) => res.send(campaign))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  })
);
router.post("/api/campaign", (req, res) =>
  Campaign.findOne({
    where: {
      id: req.body.campaign_id,
    },
    include: [
      {
        model: User,
        include: Company,
        attributes: ["name", "email", "phone", "role_id"],
      },
      Subject,
      Work_Type,
      Level,
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
        ],
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
);

router.put("/api/campaign", (req, res) => {
  Campaign.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((data) => {
      if (req.body.campaign_subject !== undefined)
        Campaign_Subject.destroy({
          where: {
            campaign_id: req.body.id,
          },
        }).then(() =>
          Campaign_Subject.bulkCreate(req.body.campaign_subject).then(
            res.send(data)
          )
        );
      else res.send(data);
    })
    .catch((err) => console.log(err));
});
/////////// candidate
router.post("/api/candidate", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      Group_Candidates.findOne({
        where: {
          campaign_id: req.body.campaign_id,
          candidate_id: authData.user_id,
        },
      })
        .then((data) => {
          if (data === null) res.sendStatus(403);
          else res.sendStatus(200);
        })
        .catch((err) => console.log(err));
    }
  });
});
router.post("/api/create_candidate", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", async (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      if (req.body.cv.length)
        await cloudinary.uploader.upload(
          req.body.cv,
          (options = { format: "png" }),
          (err, result) => {
            req.body.cv = result.url;
          }
        );
      req.body.candidate_id = authData.user_id;
      Group_Candidates.create(req.body)
        .then((data) => res.send(data))
        .catch((err) => console.log(err));
    }
  });
});
///////////////interview
router.post("/api/create_interview", (req, res) => {
  Interview.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
// get uncompleted interview
router.post("/api/get_interview", (req, res) => {
  Interview.findAll({
    where: {
      campaign_id: req.body.campaign_id,
      status: 0,
    },
    include: [
      {
        model: Group_Candidates,
        include: [User],
      },
    ],
    order: [["id"], [Group_Candidates, "interview_time"]],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

//// get report from complete INTERVIEW
router.post("/api/completed_interview", async (req, res) => {
  let getQuestionTable = () =>
    QuestionTable.findOne({
      where: { campaign_id: req.body.campaign_id },
    }).then((quiz) => {
      return quiz;
    });
  let table_id = 0;
  await getQuestionTable().then((quiz) => {
    if (quiz !== null) table_id = quiz.id;
  });
  let getListInterview = async () =>
    Interview.findAll({
      where: {
        campaign_id: req.body.campaign_id,
        status: 1,
      },
      include: [
        {
          model: Group_Candidates,
          include: [{ model: User, attributes: ["name", "email", "phone"] }],
        },
        {
          model: Campaign,
          include: [{ model: QuestionTable, attributes: ["bench_mark"] }],
          attributes: ["id"],
        },
        { model: User, attributes: ["name", "email", "phone"] },
      ],

      order: [["id"], [Group_Candidates, "interview_time"]],
    })
      .then(async (interviews) => {
        let getRecord = async (candidate_id) =>
          AnswerRecord.findAll({
            where: {
              id: 1,
              user_id: candidate_id,
              question_table_id: table_id,
            },
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
              {
                model: User,
                attributes: ["id", "name"],
              },
            ],
          }).then((data) => {
            return data;
          });
        if (interviews.length) {
          for (let i = 0; i < interviews.length; i++) {
            // let user_record = [];
            for (let j = 0; j < interviews[i].group_candidates.length; j++) {
              interviews[i].group_candidates[
                j
              ].answer_records = await getRecord(
                interviews[i].group_candidates[j].candidate_id
              );
            }
          }

          return interviews;
        }
        return [
          {
            id: 0,
          },
        ];
      })
      .catch((err) => console.log(err));
  //get interview

  let interviews = [];
  interviews = await getListInterview();
  // modyfy interview to have a record
  // interviews[0].group_candidates[0].answer_records = 1;

  res.send(interviews);
});

//get interview candidates

router.post("/api/get_interview_candidates", (req, res) => {
  Group_Candidates.findAll({
    where: {
      campaign_id: req.body.campaign_id,
      interview_id: req.body.interview_id,
    },
    include: [User],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
//get available candidates
router.post("/api/get_available_candidates", (req, res) => {
  Group_Candidates.findAll({
    where: {
      campaign_id: req.body.campaign_id,
      interview_id: null,
    },
    include: [User],
  })
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
router.post("/api/update_group_candidates", (req, res) => {
  Group_Candidates.update(req.body, {
    where: {
      candidate_id: req.body.candidate_id,
      campaign_id: req.body.campaign_id,
    },
  })

    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});
router.get("/api/work_type", (req, res) =>
  Work_Type.findAll()
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
);
router.get("/api/level", (req, res) =>
  Level.findAll()
    .then((data) => res.send(data))
    .catch((err) => console.log(err))
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
module.exports = router;
