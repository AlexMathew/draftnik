import _ from "lodash";
import { LOAD_DRAFTS, LOAD_SINGLE_DRAFT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      const drafts = _.groupBy(action.payload.drafts, "gameweek");
      return { ...state, ...drafts };
    case LOAD_SINGLE_DRAFT:
      const singleDraft = _.groupBy([action.payload.draft], "gameweek");
      return { ...state, ...singleDraft };
    default:
      return state;
  }
};
