import {
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SELECT_COLLECTION,
  SELECT_COLLECTION_DRAFT,
} from "../actions/types";

const initialState = {
  gameweek: "1",
  draft: null,
  collectionId: null,
  collectionDraftKey: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_GAMEWEEK:
      return { ...state, gameweek: action.payload.gameweek.toString() };
    case SELECT_DRAFT:
      return { ...state, draft: action.payload.draft };
    case SELECT_COLLECTION:
      return { ...state, collectionId: action.payload.collectionId };
    case SELECT_COLLECTION_DRAFT:
      return {
        ...state,
        collectionDraftKey: action.payload.collectionDraftKey,
      };
    default:
      return state;
  }
};
