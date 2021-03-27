import _ from "lodash";
import { LOAD_COLLECTIONS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      const collections = _.keyBy(action.payload.collections, "id");
      return { ...state, ...collections };
    default:
      return state;
  }
};
