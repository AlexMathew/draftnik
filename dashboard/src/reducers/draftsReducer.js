import _ from "lodash";
import { LOAD_DRAFTS, LOAD_SINGLE_DRAFT, DELETE_DRAFT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      const drafts = _.groupBy(action.payload.drafts, "gameweek");
      return { ...state, ...drafts };
    case LOAD_SINGLE_DRAFT:
      const singleDraft = _.groupBy([action.payload.draft], "gameweek");
      return { ...state, ...singleDraft };
    case DELETE_DRAFT:
      const deletedDraft = action.payload;
      const gameweekDrafts = state[[deletedDraft.gameweek]];
      const deleteIndex = _.findIndex(
        gameweekDrafts,
        (draft) => draft.id === deletedDraft.id
      );
      return {
        ...state,
        ...{
          [deletedDraft.gameweek]: [
            ...gameweekDrafts.slice(0, deleteIndex),
            ...gameweekDrafts.slice(deleteIndex + 1),
          ],
        },
      };
    default:
      return state;
  }
};
