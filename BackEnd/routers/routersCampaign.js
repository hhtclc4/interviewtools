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

///////////////////////////////////////////
router.get("/api/campaign", (req, res) =>
  Campaign.findAll({
    include: [{ model: User, attributes: ["name", "email", "phone"] }]
  })
    .then(data => res.send(data))
    .catch(err => console.log(err))
);
router.post("/api/campaign", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.user_id = authData.user_id.id;
      Campaign.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    }
  });
});
router.post("/api/group_candidates", verifyToken, (req, res) => {
  jwt.verify(req.token, "hoangtri", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      req.body.candidate_id = authData.user_id.id;
      Group_Candidates.create(req.body)
        .then(data => res.send(data))
        .catch(err => console.log(err));
    }
  });
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
module.exports = router;
