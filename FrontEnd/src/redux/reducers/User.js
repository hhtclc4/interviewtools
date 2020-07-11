import * as types from "../actions/actionTypes";

let initialState = {
  isDoneLoading: false,
  showQuizCode: false,
  user: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    avatar: "",
    company: {
      name: "",
      image: "",
      address: "",
    },
    type: 0,
    description: "",
  },
};
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      state.user = { ...action.data };
      return {
        ...state,
      };
    case types.SHOW_QUESTION_TABLE:
      if (typeof action.data !== "undefined")
        state = {
          ...state,
          ...action.data,
          isDoneLoading: true,
          user: action.data[0],
        };

      return {
        ...state,
      };

    case types.SHOW_ONE_QUESTION_TABLE:
      return {
        ...state,
        question_table: { ...action.data },
        showQuizCode: true,
      };
    case types.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.data },
      };
    case types.CLOSE_CODE_QUESTION_TABLE:
      return {
        ...state,
        showQuizCode: false,
      };
    case types.CHECK_USER_DO_QUIZ:
      state.isPlayedBefore = action.data;
      return { ...state };
    default:
      return state;
  }
};
export default myReducer;
