import { LOAD_PLAYER_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PLAYER_DATA:
      return { ...state, ...action.payload.static.players };
    default:
      return state;
  }
};
