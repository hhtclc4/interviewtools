import * as types from "../actions/actionTypes";

let initialState = [
  {
    id: 0,
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
    case types.SHOW_CAMPAIGN:
      let location = action.data.company_address.split(",");
      let last = location.length - 1;
      action.data.location = location[last];
      return { ...action.data };
    default:
      return state;
  }
};
export default myReducer;
