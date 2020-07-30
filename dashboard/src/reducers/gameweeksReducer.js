import { LOAD_GAMEWEEK_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_GAMEWEEK_DATA:
      return { ...state, ...action.payload.static.gameweeks };
    default:
      return state;
  }
};
