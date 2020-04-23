import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
    name: "",
    date: "2020-01-01",
    time: "12:00:00",
    campaign_id: "",
    group_candidates: [
      {
        candidate_id: 0,
        cv: "",
        description: "",
        interview_time: "12:00:00",
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
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INTERVIEWS:
      state = [...action.data];
      return [...state];
    case types.SHOW_INTERVIEWS:
      return [...state];
    case types.CREATE_INTERVIEW:
      state.push(action.data);
      return [...state];

    default:
      return [...state];
  }
};
export default myReducer;
