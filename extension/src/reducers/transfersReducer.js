import { INDICATE_REFRESH, CLEAR_REFRESH, RESET_DATA } from "../actions/types";

const INITIAL_STATE = {
  saved: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INDICATE_REFRESH:
      return { ...state, saved: true };
    case CLEAR_REFRESH:
      return { ...state, saved: false };
    case RESET_DATA:
      return { ...state, saved: false };
    default:
      return state;
  }
};
