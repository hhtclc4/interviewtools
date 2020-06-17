import * as types from "../actions/actionTypes";

let initialState = {
  data: [],
  access: true,
  right_answer: 0,
  wrong_answer: 0,
  count: 0,
};

let calculateAccuracy = (data) => {
  //calculate the accuracy
  let unAttempt = 0;
  let answer = {
    right_answer: 0,
    wrong_answer: 0,
  };
  data.forEach((attempt) => {
    if (attempt.question.type === 1) {
      if (attempt.question_choice.is_right === 1) {
        answer.right_answer += 1;
      }
      if (attempt.question_choice.is_right === 0) {
        answer.wrong_answer += 1;
      }
      if (attempt.question_choice.is_right === 2) {
        unAttempt = unAttempt + 1;
      }
    } else if (attempt.question.type === 2) {
      let questionRightTotal = 0;
      let multiRightTotal = 0;
      for (let i = 0; i < attempt.question.question_choices.length; i++)
        if (attempt.question.question_choices[i].is_right === 1)
          questionRightTotal++;
      if (attempt.multi_choice_id !== null) {
        let { question_choices } = attempt.multi_choice;
        for (let i = 0; i < question_choices.length; i++)
          if (question_choices[i].is_right === 1) multiRightTotal++;
      }
      if (multiRightTotal === questionRightTotal) answer.right_answer += 1;
      else answer.wrong_answer += 1;
    }
  });

  return answer;
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ANSWER_RECORD:
      state.data = [...action.data];

      return { ...state };
    case types.SHOW_USER_ATTEMPT:
      state.data = [...action.data];
      return { ...state };
    case types.GET_CURRENT_RECORD:
      if (action.data.length < action.questionLength) {
        let answer = calculateAccuracy(action.data);
        state.right_answer = answer.right_answer;
        state.wrong_answer = answer.wrong_answer;
        state.count = action.data.length;
        return { ...state };
      } else return { ...state, access: false };
    case types.RESET_ATTEMPT_REDUX:
      state.access = true;
      state.right_answer = 0;
      state.count = 0;
      console.log("CHANGEGGG ", state);
      return { ...state };
    default:
      return state;
  }
};
export default myReducer;
