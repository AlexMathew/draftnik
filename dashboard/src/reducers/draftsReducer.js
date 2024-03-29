import _ from "lodash";
import {
  LOAD_DRAFTS,
  LOAD_SINGLE_DRAFT,
  DELETE_DRAFT,
  RENAME_DRAFT,
  MOVE_DRAFT,
  LOAD_DRAFTS_BY_ID,
} from "../actions/types";

const initialState = {
  byId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DRAFTS:
      const drafts = _.groupBy(action.payload.drafts, "gameweek");
      return { ...state, ...drafts };
    case LOAD_SINGLE_DRAFT:
      const singleDraft = _.groupBy([action.payload.draft], "gameweek");
      return { ...state, ...singleDraft };
    case LOAD_DRAFTS_BY_ID:
      const draftsById = _.keyBy(action.payload.drafts, "id");
      return { ...state, byId: draftsById };
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
      const renamedDraftById = state.byId[[renamedDraft.id]];
      renamedDraftById.name = action.payload.name;
      return {
        ...state,
        ...{
          [renamedDraft.gameweek]: [
            ...renamedGameweekDrafts.slice(0, renameIndex),
            renamedDraft,
            ...renamedGameweekDrafts.slice(renameIndex + 1),
          ],
          byId: { ...state.byId, [renamedDraftById.id]: renamedDraftById },
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
      const movedDraftById = state.byId[[movedDraft.id]];
      movedDraftById.gameweek = newGameweek;
      return {
        ...state,
        ...{
          [movedGameweek]: [
            ...movedGameweekDrafts.slice(0, moveIndex),
            ...movedGameweekDrafts.slice(moveIndex + 1),
          ],
          [newGameweek]: [movedDraft, ...newGameweekDrafts],
          byId: { ...state.byId, [movedDraftById.id]: movedDraftById },
        },
      };
    default:
      return state;
  }
};
