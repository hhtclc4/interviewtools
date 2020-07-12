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
const Company = require("../models/Company");
const Group_Candidates = require("../models/Group_Candidates");
const Level = require("../models/Level");
const Interview = require("../models/Interview");
const Campaign_Subject = require("../models/Campaign_Subject");
const Education = require("../models/Education");
const Skills = require("../models/Skills");
const Employment = require("../models/Employment");
const Invite = require("../models/Invite");

////////////// Work_Type Level
Work_Type.hasMany(Campaign, { foreignKey: "work_type_id" });
Level.hasMany(Campaign, { foreignKey: "level_id" });
/////////////// Company
Company.hasMany(User, { foreignKey: "company_id" });
///////////////education
Education.hasMany(User, { foreignKey: "education_id" });

////////////// Campaign
Campaign.belongsTo(Work_Type, {
  foreignKey: "work_type_id",
});
Campaign.belongsTo(Level, {
  foreignKey: "level_id",
});
Campaign.belongsTo(User, {
  foreignKey: "user_id",
});
Campaign.belongsToMany(Subject, {
  through: Campaign_Subject,
  foreignKey: "campaign_id",
});
Campaign.belongsToMany(User, {
  through: Group_Candidates,
  foreignKey: "campaign_id",
});
Campaign.belongsToMany(User, {
  through: Invite,
  foreignKey: "campaign_id",
});
Campaign.hasMany(Interview, { foreignKey: "campaign_id" });

Campaign.hasOne(QuestionTable, { foreignKey: "campaign_id" });
//////////////Invite
Invite.belongsTo(User, {
  foreignKey: "user_id",
});
Invite.belongsTo(Campaign, { foreignKey: "campaign_id" });
/////////////// Interview
Interview.hasMany(Group_Candidates, { foreignKey: "interview_id" });
Interview.belongsTo(Campaign, {
  foreignKey: "campaign_id",
});
Interview.belongsTo(User, {
  foreignKey: "user_id",
});
//////////////Employment
Employment.belongsTo(User, {
  foreignKey: "user_id",
});
///////////// Group_Candidates

Group_Candidates.belongsTo(User, {
  foreignKey: "candidate_id",
});
Group_Candidates.belongsTo(Campaign, { foreignKey: "campaign_id" });
Group_Candidates.belongsTo(Interview, { foreignKey: "interview_id" });
//////////////Campaign_Subject
Campaign_Subject.belongsTo(Campaign, { foreignKey: "campaign_id" });
Campaign_Subject.belongsTo(Subject, { foreignKey: "subject_id" });
//////////////UserRole
UserRole.hasMany(User, { foreignKey: "role_id" });
///////////////Skills
Skills.belongsTo(User, { foreignKey: "user_id" });
Skills.belongsTo(Subject, { foreignKey: "subject_id" });
////////////// Subject
Subject.belongsToMany(User, {
  through: Skills,
  foreignKey: "subject_id",
});
Subject.belongsToMany(Campaign, {
  through: Campaign_Subject,
  foreignKey: "subject_id",
});
///////////////////// User
User.belongsToMany(Campaign, {
  through: Group_Candidates,
  foreignKey: "candidate_id",
});
User.belongsToMany(Campaign, {
  through: Invite,
  foreignKey: "user_id",
});
User.belongsToMany(Subject, {
  through: Skills,
  foreignKey: "subject_id",
});
User.hasMany(Interview, {
  foreignKey: "user_id",
});
User.hasMany(Employment, {
  foreignKey: "user_id",
});
User.hasMany(QuestionTable, { foreignKey: "admin" });

User.belongsTo(UserRole, {
  foreignKey: "role_id",
});
User.belongsTo(Company, {
  foreignKey: "company_id",
});
User.belongsTo(Education, {
  foreignKey: "education_id",
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

QuestionTable.belongsTo(User, {
  foreignKey: "admin",
});
QuestionTable.belongsToMany(Question, {
  through: QuestionTable_Question,
  foreignKey: "question_table_id",
});
QuestionTable.hasMany(AnswerRecord, {
  foreignKey: "question_table_id",
});
QuestionTable.belongsTo(Campaign, {
  foreignKey: "campaign_id",
});

////////////////////// Question
Question.belongsToMany(QuestionTable, {
  through: QuestionTable_Question,
  foreignKey: "question_id",
});
Question.hasMany(QuestionChoices, {
  foreignKey: "question_id",
});
Question.hasMany(AnswerRecord, {
  foreignKey: "question_id",
});
/////////////////////// QuestionChoices
QuestionChoices.belongsTo(Question, {
  foreignKey: "question_id",
});
QuestionChoices.hasMany(AnswerRecord, {
  foreignKey: "choice_id",
});
//
QuestionChoices.belongsToMany(MultiChoices, {
  through: MultiChoices_Choices,
  foreignKey: "choice_id",
});
/////////////////////// MultiChoices
MultiChoices.belongsToMany(QuestionChoices, {
  through: MultiChoices_Choices,
  foreignKey: "multi_choice_id",
});
///////////////////// MultiChoices_Choices
MultiChoices_Choices.belongsTo(MultiChoices, {
  foreignKey: "multi_choice_id",
});
MultiChoices_Choices.belongsTo(QuestionChoices, {
  foreignKey: "choice_id",
});
//////////////////////// QuestionTable_Question
QuestionTable_Question.belongsTo(QuestionTable, {
  foreignKey: "question_table_id",
});
QuestionTable_Question.belongsTo(Question, { foreignKey: "question_id" });

module.exports = router;
