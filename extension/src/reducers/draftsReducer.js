import _ from "lodash";
import { LOAD_DRAFTS, RESET_DATA } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      const drafts = _.groupBy(action.payload.drafts, "gameweek");
      return { ...state, ...drafts };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
