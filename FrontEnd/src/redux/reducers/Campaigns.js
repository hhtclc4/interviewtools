import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
    title: "",
    subject_id: 0,
    company_address: "",
    level_id: 0,
    amount_required: 0,
    work_type_id: 0,
    sex: 0,
    experience: 0,
    salary: 0,
    deadline: "",
    user_id: 0,
    work_description: "",
    candidate_req: "",
    candidate_benefits: "",
    location: "",
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
  },
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_CAMPAIGNS:
      state = [...action.data];
      for (let i = 0; i < state.length; i++) {
        let location = state[i].company_address.split(",");
        let last = location.length - 1;
        state[i].location = location[last];
      }
      return [...state];

    default:
      return state;
  }
};
export default myReducer;
