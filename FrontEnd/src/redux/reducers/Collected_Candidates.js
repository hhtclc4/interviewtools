import * as types from "../actions/actionTypes";

let initialState = [
  {
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
    education: {
      degree: 0,
    },
    subjects: [{ id: 0, title: "", skills: {} }],
    employments: [
      {
        position: 0,
      },
    ],
    type: 0,
    description: "",
  },
];
let myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COLLECTED_CANDIDATES:
      state = action.data;
      return [...state];
    case types.SHOW_COLLECTED_CANDIDATES:
      return [...state];
    case types.FILTED_COLLECTED_CANDIDATES:
      state = action.data;
      return [...state];

    default:
      return state;
  }
};
export default myReducer;
