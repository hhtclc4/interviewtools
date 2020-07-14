import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
    title: "",
    subject_id: 0,
    level_id: 0,
    work_type_id: 0,
    salary: 0,
    user_id: 0,
    work_description: "",
    status: true,
    subjects: [
      {
        id: 0,
        title: "",
      },
    ],
    user: {
      name: "",
      email: "",
      phone: "",
    },
    level: {
      id: 0,
      name: "",
    },
    work_type: {
      id: 0,
      name: "",
    },
    question_table: {
      code: 0,
      title: "",
      image: null,
      played: 0,
      user: { name: "" },
      questions: [],
    },
    company: {
      name: "",
      address: "",
    },
    interviews: [
      {
        id: 0,
        date: "2020-01-01",
        time_from: "12:00:00",
        time_to: "12:00:00",
      },
    ],
    interviewDateLeft: "",
    created_at: "12:00:00",
    updated_at: "12:00:00",
  },
];

let calculateDateInterviewLeft = (interviews) => {
  let currentDate = new Date();
  //Get 1 day in milliseconds
  let one_day = 1000 * 60 * 60 * 24;
  let dayArray = [];
  for (let i = 0; i < interviews.length; i++) {
    let interviewDate = new Date(interviews[i].date);

    // Convert both dates to milliseconds
    let currentDate_ms = currentDate.getTime();
    let interviewDate_ms = interviewDate.getTime();

    // Calculate the difference in milliseconds
    let difference_ms = interviewDate_ms - currentDate_ms;
    if (difference_ms >= 0) dayArray.push(Math.round(difference_ms / one_day));
  }
  // Convert back to days and return
  return Math.min(...dayArray);
};
let switchCase = (value) => {
  switch (value) {
    case 0:
      return "Today";
    case 1:
      return "1 Day Left";
    case 2:
      return "2 Day Left";

    default:
      break;
  }
};

let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CAMPAIGNS:
      state = [...action.data];

      return [...state].slice(0, 10);
    case types.GET_CAMPAIGNS_INTERVIEWER:
      state = [...action.data];
      if (state.length) state[0].isDoneLoading = true;
      return [...state];

    case types.SHOW_CAMPAIGNS:
      for (let i = 0; i < state.length - 1; i++) {
        for (let j = i + 1; j < state.length; j++) {
          let i1 = calculateDateInterviewLeft(state[i].interviews);
          let i2 = calculateDateInterviewLeft(state[j].interviews);
          state[i].interviewDateLeft = switchCase(i1);
          if (i1 > i2) {
            let tempt = { ...state[i] };
            state[i] = { ...state[j] };
            state[j] = { ...tempt };
          }
        }
      }
      return [...state];
    case types.SHOW_CAMPAIGNS_2:
      return [...state].slice(0, 10);

    case types.CREATE_CAMPAIGN:
      state.push({ ...action.data });

      return [...state];

    default:
      return state;
  }
};
export default myReducer;
