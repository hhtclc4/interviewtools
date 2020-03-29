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
const Group_Candidates = require("../models/Group_Candidates");
const Level = require("../models/Level");
const Interview = require("../models/Interview");
const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

const data = {
  question: "what is dota",
  time: 20,
  question_choices: {
    question_id: 1,
    answer: "aaa",
    is_right: 1
  },
  question_table_id: 1
};
///////////////////////////////////////////
router.post("/api/candidate", (req, res) =>
  Group_Candidates.findAll({
    include: [User],
    where: {
      campaign_id: 1
    }
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
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
