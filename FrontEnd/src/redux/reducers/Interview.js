import * as types from "../actions/actionTypes";

let initialState = [];
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
