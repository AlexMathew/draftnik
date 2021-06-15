import _ from "lodash";
import { LOAD_COLLECTIONS, DELETE_COLLECTION_DRAFT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      const collections = _.keyBy(action.payload.collections, "id");
      return { ...state, ...collections };
    case DELETE_COLLECTION_DRAFT:
      const draftToDelete = action.payload.draftId;
      const newCollections = {};
      _.each(state, (collection) => {
        collection.drafts = _.filter(
          collection.drafts,
          (draft) => draft.id !== draftToDelete
        );
        newCollections[collection.id] = collection;
      });
      return { ...state, ...newCollections };
    default:
      return state;
  }
};
