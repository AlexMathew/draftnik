import { LOAD_PLAYER_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_PLAYER_DATA:
      return { ...state, ...action.payload.static.players };
    default:
      return state;
  }
};
