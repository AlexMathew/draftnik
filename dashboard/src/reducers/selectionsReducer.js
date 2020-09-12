import { SELECT_DRAFT, SELECT_GAMEWEEK } from "../actions/types";

const initialState = {
  gameweek: "2",
  draft: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_GAMEWEEK:
      return { ...state, gameweek: action.payload.gameweek.toString() };
    case SELECT_DRAFT:
      return { ...state, draft: action.payload.draft };
    default:
      return state;
  }
};
