import {
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
} from "../actions/types";

const INITIAL_STATE = {
  static: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING_STATIC_DATA:
      return { ...state, static: true };
    case STOP_LOADING_STATIC_DATA:
      return { ...state, static: false };
    default:
      return state;
  }
};
