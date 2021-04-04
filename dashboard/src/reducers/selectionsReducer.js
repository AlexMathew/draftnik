import {
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SELECT_COLLECTION,
} from "../actions/types";

const initialState = {
  gameweek: "1",
  draft: null,
  collectionId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_GAMEWEEK:
      return { ...state, gameweek: action.payload.gameweek.toString() };
    case SELECT_DRAFT:
      return { ...state, draft: action.payload.draft };
    case SELECT_COLLECTION:
      return { ...state, collectionId: action.payload.collectionId };
    default:
      return state;
  }
};
