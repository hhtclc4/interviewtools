import * as types from "../actions/actionTypes";

let initialState = [];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_GROUP_CANDIDATES:
      state = [...action.data];
      return [...state];
    default:
      return state;
  }
};
export default myReducer;
