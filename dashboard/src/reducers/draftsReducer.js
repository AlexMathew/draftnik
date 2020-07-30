import _ from "lodash";
import { LOAD_DRAFTS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      const drafts = _.groupBy(action.payload.drafts, "gameweek");
      return { ...state, ...drafts };
    default:
      return state;
  }
};
