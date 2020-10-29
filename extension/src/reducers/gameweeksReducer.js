import { LOAD_GAMEWEEK_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GAMEWEEK_DATA:
      return { ...state, ...action.payload.static.gameweeks };
    default:
      return state;
  }
};
