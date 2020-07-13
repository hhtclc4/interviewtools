import * as types from "../actions/actionTypes";

let initialState = {
  campaign_id: 0,
  user_id: 0,
  cv: "",
  description: "",
  isSendCvBefore: false,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_CV_SUCCESS:
      return { ...state, ...action.data, isSendCvBefore: true };
    case types.CANDIDATE_SENT_CV:
      return { ...state, isSendCvBefore: true };
    case types.CANDIDATE_NOT_SEND_CV:
      return { ...state, isSendCvBefore: false };
    default:
      return state;
  }
};
export default myReducer;
