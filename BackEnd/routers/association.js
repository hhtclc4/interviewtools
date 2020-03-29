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
////////////// Work_Type Level
Work_Type.hasMany(Campaign, { foreignKey: "work_type_id" });
Level.hasMany(Campaign, { foreignKey: "level_id" });

////////////// Campaign
Campaign.belongsTo(Work_Type, {
  foreignKey: "work_type_id"
});
Campaign.belongsTo(Level, {
  foreignKey: "level_id"
});
Campaign.belongsTo(User, {
  foreignKey: "user_id"
});
Campaign.belongsToMany(User, {
  through: Group_Candidates,
  foreignKey: "campaign_id"
});
Campaign.hasMany(Interview, { foreignKey: "campaign_id" });

Campaign.hasOne(QuestionTable, { foreignKey: "campaign_id" });

/////////////// Interview
Interview.hasMany(Group_Candidates, { foreignKey: "interview_id" });
Interview.belongsTo(Campaign, {
  foreignKey: "campaign_id"
});
///////////// Group_Candidates
Group_Candidates.belongsTo(User, {
  foreignKey: "candidate_id"
});
Group_Candidates.belongsTo(Campaign, { foreignKey: "campaign_id" });
Group_Candidates.belongsTo(Interview, { foreignKey: "interview_id" });

//////////////UserRole
UserRole.hasMany(User, { foreignKey: "role_id" });
////////////// Subject
Subject.hasMany(QuestionTable, { foreignKey: "subject_id" });
///////////////////// User
User.belongsToMany(Campaign, {
  through: Group_Candidates,
  foreignKey: "candidate_id"
});
User.hasMany(QuestionTable, { foreignKey: "admin" });

User.belongsTo(UserRole, {
  foreignKey: "role_id"
});
User.hasMany(AnswerRecord, { foreignKey: "user_id" });
User.hasMany(Campaign, { foreignKey: "user_id" });

//////////////////// AnswerRecord
AnswerRecord.belongsTo(User, { foreignKey: "user_id" });
AnswerRecord.belongsTo(QuestionTable, { foreignKey: "question_table_id" });
AnswerRecord.belongsTo(Question, { foreignKey: "question_id" });
AnswerRecord.belongsTo(QuestionChoices, { foreignKey: "choice_id" });
//
AnswerRecord.belongsTo(MultiChoices, { foreignKey: "multi_choice_id" });

////////////////// QuestionTable
QuestionTable.belongsTo(Subject, {
  foreignKey: "subject_id"
});
QuestionTable.belongsTo(User, {
  foreignKey: "admin"
});
QuestionTable.belongsToMany(Question, {
  through: QuestionTable_Question,
  foreignKey: "question_table_id"
});
QuestionTable.hasMany(AnswerRecord, {
  foreignKey: "question_table_id"
});
QuestionTable.belongsTo(Campaign, {
  foreignKey: "campaign_id"
});
////////////////////// Question
Question.belongsToMany(QuestionTable, {
  through: QuestionTable_Question,
  foreignKey: "question_id"
});
Question.hasMany(QuestionChoices, {
  foreignKey: "question_id"
});
Question.hasMany(AnswerRecord, {
  foreignKey: "question_id"
});
/////////////////////// QuestionChoices
QuestionChoices.belongsTo(Question, {
  foreignKey: "question_id"
});
QuestionChoices.hasMany(AnswerRecord, {
  foreignKey: "choice_id"
});
//
QuestionChoices.belongsToMany(MultiChoices, {
  through: MultiChoices_Choices,
  foreignKey: "choice_id"
});
/////////////////////// MultiChoices
MultiChoices.belongsToMany(QuestionChoices, {
  through: MultiChoices_Choices,
  foreignKey: "multi_choice_id"
});
///////////////////// MultiChoices_Choices
MultiChoices_Choices.belongsTo(MultiChoices, {
  foreignKey: "multi_choice_id"
});
MultiChoices_Choices.belongsTo(QuestionChoices, {
  foreignKey: "choice_id"
});
//////////////////////// QuestionTable_Question
QuestionTable_Question.belongsTo(QuestionTable, {
  foreignKey: "question_table_id"
});
QuestionTable_Question.belongsTo(Question, { foreignKey: "question_id" });

module.exports = router;
