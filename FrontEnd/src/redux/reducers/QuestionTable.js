import * as types from "../actions/actionTypes";
const initialState = {
  campaign: {
    subjects: [{ id: 0, title: "" }],
  },
  questions: [
    {
      id: 0,
      question: "",
      question_choices: [],
      time: 0,
    },
  ],
  attempt_length: 0,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_QUESTION_ANSWERS: {
      state = { ...state, ...action.data };
      return { ...state };
    }
    case types.SHOW_QUESTION_AFTER_DELETE:
      state.questions.splice(action.index, 1);
      return { ...state };
    case types.CREATE_QUESTION_TABLE:
      return { ...action.data };
    case types.UPDATE_QUESTION_TABLE_QUESTION:
      state.questions[action.index] = {
        ...state.questions[action.index],
        question: action.question.question,
        time: action.question.time,
        is_one_right_ans: action.question.is_one_right_ans,
        question_choices: [...action.question_choices],
      };
      return { ...state };
    case types.UPDATE_QUESTION_TABLE: {
      state = {
        ...state,
        ...action.data,
      };
      return { ...state };
    }

    case types.UPDATE_TIME:
      state.questions[action.index] = {
        ...state.questions[action.index],
        time: action.data.time,
      };
      return { ...state };
    case types.GET_ATTEMPT_LENGTH:
      state.attempt_length = action.attempt_length;
      return { ...state };
    default:
      return { ...state };
  }
};
export default myReducer;
