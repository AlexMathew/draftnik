import { LOAD_TEAM_DATA, RESET_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TEAM_DATA:
      return { ...state, ...action.payload.static.teams };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
