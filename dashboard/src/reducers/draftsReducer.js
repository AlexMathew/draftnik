import _ from "lodash";
import {
  LOAD_DRAFTS,
  LOAD_SINGLE_DRAFT,
  DELETE_DRAFT,
  RENAME_DRAFT,
  MOVE_DRAFT,
} from "../actions/types";

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
      const deletedGameweekDrafts = state[[deletedDraft.gameweek]];
      const deleteIndex = _.findIndex(
        deletedGameweekDrafts,
        (draft) => draft.id === deletedDraft.id
      );
      return {
        ...state,
        ...{
          [deletedDraft.gameweek]: [
            ...deletedGameweekDrafts.slice(0, deleteIndex),
            ...deletedGameweekDrafts.slice(deleteIndex + 1),
          ],
        },
      };
    case RENAME_DRAFT:
      const renamedDraft = action.payload.draft;
      const renamedGameweekDrafts = state[[renamedDraft.gameweek]];
      const renameIndex = _.findIndex(
        renamedGameweekDrafts,
        (draft) => draft.id === renamedDraft.id
      );
      renamedDraft.name = action.payload.name;
      return {
        ...state,
        ...{
          [renamedDraft.gameweek]: [
            ...renamedGameweekDrafts.slice(0, renameIndex),
            renamedDraft,
            ...renamedGameweekDrafts.slice(renameIndex + 1),
          ],
        },
      };
    case MOVE_DRAFT:
      const movedDraft = action.payload.draft;
      const movedGameweek = action.payload.originalGameweek;
      const movedGameweekDrafts = state[[movedGameweek]] || [];
      const moveIndex = _.findIndex(
        movedGameweekDrafts,
        (draft) => draft.id === movedDraft.id
      );
      const newGameweek = action.payload.gameweek;
      const newGameweekDrafts = state[[newGameweek]] || [];
      movedDraft.gameweek = newGameweek;
      return {
        ...state,
        ...{
          [movedGameweek]: [
            ...movedGameweekDrafts.slice(0, moveIndex),
            ...movedGameweekDrafts.slice(moveIndex + 1),
          ],
          [newGameweek]: [movedDraft, ...newGameweekDrafts],
        },
      };
    default:
      return state;
  }
};
