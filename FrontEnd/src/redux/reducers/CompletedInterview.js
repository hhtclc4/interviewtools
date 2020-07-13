import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
    name: "",
    date: "2020-01-01",
    time: "12:00:00",
    campaign_id: "",

    campaign: {
      question_table: { bench_mark: 70 },
    },
    group_candidates: [
      {
        user_id: 0,
        cv: "",
        description: "",
        interview_time: "12:00:00",
        answer_records: [],
        user: {
          id: 0,
          name: "",
          email: "",
          phone: "",
        },
      },
    ],
  },
];

let calculate = (attemptList) => {
  let accuracyArr = [];
  attemptList.forEach((answerRecord) => {
    accuracyArr.push(calculateAccuracy(answerRecord));
  });
  let max = accuracyArr[0].accuracy;
  let result = { ...accuracyArr[0] };
  for (let i = 0; i < accuracyArr.length; i++)
    if (accuracyArr[i].accuracy <= max) {
      max = accuracyArr[i].accuracy;
      result = accuracyArr[i];
    }
  return result;
};

let calculateAccuracy = (data) => {
  //calculate the accuracy
  let correctAnswer = 0;
  let unAttempt = 0;
  data.forEach((attempt) => {
    if (attempt.question.type === 1) {
      if (attempt.question_choice.is_right === 1) {
        correctAnswer = correctAnswer + 1;
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
      } else unAttempt = unAttempt + 1;

      if (multiRightTotal === questionRightTotal) correctAnswer++;
    }
  });
  let textQuestion = 0;
  data.forEach((sub) => {
    if (sub.question.type === 3) textQuestion++;
  });

  let accuracy =
    (correctAnswer / (data.length - textQuestion)).toFixed(2) * 100;
  let result = {
    accuracy,
    correctAnswer,
    inCorrectAnswer: data.length - textQuestion - unAttempt - correctAnswer,
    unAttemptAnswer: unAttempt,
  };
  return result;
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COMPLETED_INTERVIEWS_API:
      state = [...action.data];
      if (state[0].id !== 0)
        for (let k = 0; k < state.length; k++) {
          for (let j = 0; j < state[k].group_candidates.length; j++) {
            let { answer_records } = state[k].group_candidates[j];
            let answerRecord = [];
            let attempt = [];

            for (let i = 0; i < answer_records.length; i++) {
              answerRecord.push(answer_records[i]);
              if (
                i === answer_records.length - 1 || //in boundary
                answer_records[i].id !== answer_records[i + 1].id ||
                answer_records[i].user_id !== answer_records[i + 1].user_id
              ) {
                attempt.push(answerRecord);
                answerRecord = [];
              }
              if (
                i === answer_records.length - 1 || //in boundary
                answer_records[i].user_id !== answer_records[i + 1].user_id
              ) {
                state[k].group_candidates[j].answer_records = attempt;
                attempt = [];
              }
            }
          }
          let accuracyArr = [];

          for (let i = 0; i < state[k].group_candidates.length; i++) {
            let result = calculate(state[k].group_candidates[i].answer_records);
            accuracyArr.push(result.accuracy);
            state[k].group_candidates[i].accuracy = result.accuracy;
            state[k].group_candidates[i].correctAnswer = result.correctAnswer;
            state[k].group_candidates[i].inCorrectAnswer =
              result.inCorrectAnswer;
            state[k].group_candidates[i].unAttemptAnswer =
              result.unAttemptAnswer;
          }

          let accuracy = 0;
          for (let i = 0; i < accuracyArr.length; i++)
            accuracy += accuracyArr[i];
          let totalAccuracy = accuracy.toFixed(2) / accuracyArr.length;
          state[k].totalAccuracy = totalAccuracy;
        }

      return [...state];
    case types.GET_COMPLETED_INTERVIEWS:
      return [...state];

    default:
      return [...state];
  }
};
export default myReducer;
