import { LOAD_TEAM_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_TEAM_DATA:
      return { ...state, ...action.payload.static.teams };
    default:
      return state;
  }
};
