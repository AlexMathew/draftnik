import { LOAD_TEAM_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TEAM_DATA:
      return { ...state, ...action.payload.static.teams };
    default:
      return state;
  }
};
