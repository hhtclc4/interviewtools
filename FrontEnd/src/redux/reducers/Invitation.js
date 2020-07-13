import * as types from "../actions/actionTypes";

let initialState = [
  {
    campaign_id: 0,
    user_id: 0,
    campaign: {
      title: "",
      salary: 0,
      work_description: "",
      location: "",
      user: {
        company: {
          id: 0,
          name: "",
          address: "",
        },
      },
      subjects: [
        {
          id: 0,
          title: "",
        },
      ],
      isCreated: false,
    },
  },
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_INVITATION:
      return { isCreated: true };

    case types.GET_INVITATION:
      state = [...action.data];
      return [...state];
    case types.UPDATE_INVITATION:
      for (let i = 0; i < state.length; i++)
        if (state[i].campaign_id === action.campaign_id) state.splice(i, 1);
      return [...state];

    default:
      return state;
  }
};
export default myReducer;
