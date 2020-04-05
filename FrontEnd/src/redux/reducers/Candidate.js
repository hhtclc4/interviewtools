import * as types from "../actions/actionTypes";

let initialState = {
  campaign_id: 0,
  candidate_id: 0,
  cv: "",
  description: ""
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_CV_SUCCESS:
      state = action.data;
      return { ...state };
    case types.CHECK_CANDIDATE:
      state = action.data;
      return { ...state };
    default:
      return state;
  }
};
export default myReducer;
