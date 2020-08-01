import { LOAD_TEAM_FIXTURES_DATA } from "../actions/types";

const initialState = {
  byTeam: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAM_FIXTURES_DATA:
      return { ...state, byTeam: action.payload.static.team_fixtures };
    default:
      return state;
  }
};
