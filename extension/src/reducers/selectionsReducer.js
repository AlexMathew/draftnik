import {
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SET_CURRENT_GAMEWEEK,
  RESET_DATA,
} from "../actions/types";

const INITIAL_STATE = {
  gameweek: "1",
  currentGameweek: "1",
  draft: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_GAMEWEEK:
      return {
        ...state,
        currentGameweek: action.payload.currentGameweek.toString(),
      };
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
