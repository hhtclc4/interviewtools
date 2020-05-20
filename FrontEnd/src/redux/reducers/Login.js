import * as types from "../actions/actionTypes";

let initialState = {
  name: "",
  email: "",
  password: "",
  checkLogin: false,
  token: "",
  isLoading: false,
  role_id: 0,
  isDoneSignUp: false,
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      state = { ...action.data };
      state.checkLogin = true;
      state.isLoading = false;
      return {
        ...state,
      };
    case types.GET_USER:
      state = { ...action.data };
      state.checkLogin = true;

      return {
        ...state,
      };
    case types.SIGN_UP_SUCCESS:
      state = { ...action.data };
      state.checkLogin = true;
      state.isLoading = false;
      state.isDoneSignUp = true;
      return {
        ...state,
      };
    case types.SIGN_UP_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default myReducer;
