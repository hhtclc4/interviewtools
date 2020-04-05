// import login from './login';
// import profile from './profile';
import questionTable from "./QuestionTable";
import question from "./Question";
import subject from "./Subject";
import login from "./Login";
import user from "./User";
import attempt from "./Attempt";
import completed from "./CompletedQuiz";
import teleport from "./Teleport";
import report from "./Report";
import campaign from "./Campaign";
import group_candidates from "./Group_Candidates";
import candidate from "./Candidate";
import accessToPush from "./Access_To_Push";

import { combineReducers } from "redux";
const myReducer = combineReducers({
  question,
  questionTable,
  subject,
  login,
  user,
  attempt,
  completed,
  teleport,
  report,
  campaign,
  group_candidates,
  candidate,
  accessToPush,
});
export default myReducer;
