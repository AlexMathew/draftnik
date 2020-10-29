import { SELECT_DRAFT, SELECT_GAMEWEEK, RESET_DATA } from "../actions/types";

const INITIAL_STATE = {
  gameweek: "1",
  draft: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_GAMEWEEK:
      return { ...state, gameweek: action.payload.gameweek.toString() };
    case SELECT_DRAFT:
      return { ...state, draft: action.payload.draft };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
