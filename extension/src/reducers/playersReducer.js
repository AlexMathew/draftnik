import { LOAD_PLAYER_DATA, RESET_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYER_DATA:
      return { ...state, ...action.payload.static.players };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
