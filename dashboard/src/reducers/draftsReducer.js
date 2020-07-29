import { LOAD_DRAFTS, SELECT_DRAFT } from "../actions/types";

const initialState = {
  selected: null,
  drafts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      return { ...state, drafts: action.payload.drafts };
    case SELECT_DRAFT:
      return { ...state, selected: action.payload.draft };
    default:
      return state;
  }
};
