import { LOAD_DRAFTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      return [...state, ...action.payload.drafts];
    default:
      return state;
  }
};
