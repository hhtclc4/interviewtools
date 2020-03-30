import * as types from "../actions/actionTypes";

let initialState = [];
let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_CAMPAIGNS:
            state = [...action.data]
            return [...action.data];
        default:
            return state;
    }
};
export default myReducer;
