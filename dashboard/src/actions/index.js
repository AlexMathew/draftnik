import _ from "lodash";
import {
  LOAD_DRAFTS,
  LOAD_DRAFTS_BY_ID,
  LOAD_SINGLE_DRAFT,
  LOAD_COLLECTIONS,
  LOAD_GAMEWEEK_DATA,
  LOAD_PLAYER_DATA,
  LOAD_TEAM_DATA,
  LOAD_FIXTURES_DATA,
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SELECT_COLLECTION,
  SELECT_COLLECTION_DRAFT,
  SWITCH_MOBILE,
  DELETE_DRAFT,
  DELETE_COLLECTION_DRAFT,
  RENAME_DRAFT,
  MOVE_DRAFT,
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
  OPEN_RENAME_MODAL,
  START_RENAME_REQUEST,
  STOP_RENAME_REQUEST,
  SET_RENAME_REQUEST_ERROR,
  CLOSE_RENAME_MODAL,
  OPEN_MOVE_MODAL,
  START_MOVE_REQUEST,
  STOP_MOVE_REQUEST,
  CLOSE_MOVE_MODAL,
  OPEN_DELETE_MODAL,
  START_DELETE_REQUEST,
  STOP_DELETE_REQUEST,
  CLOSE_DELETE_MODAL,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
  SET_CURRENT_GAMEWEEK,
} from "./types";
import draftnik from "../api/draftnik";
import history from "../history";
import { AUTH_TOKEN_FIELD } from "../constants";

export const switchMobile = () => {
  return { type: SWITCH_MOBILE };
};

export const fetchStaticData = () => async (dispatch) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
  try {
    dispatch(startStaticLoading());
    const response = await draftnik.get("/draft/static/", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({ type: LOAD_TEAM_DATA, payload: response.data });
    dispatch({ type: LOAD_PLAYER_DATA, payload: response.data });
    dispatch({ type: LOAD_GAMEWEEK_DATA, payload: response.data });
    dispatch({ type: LOAD_FIXTURES_DATA, payload: response.data });
    dispatch({ type: LOAD_DRAFTS, payload: response.data });
    dispatch({ type: LOAD_DRAFTS_BY_ID, payload: response.data });
    dispatch({ type: LOAD_COLLECTIONS, payload: response.data });

    dispatch(setCurrentGameweek(response.data.static.current_gameweek));
    dispatch(resetDraftSelection());
    dispatch(stopStaticLoading());
  } catch (error) {
    console.error(error);
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    }
  }
};

export const fetchSharedDraftDetails = (draftCode) => async (dispatch) => {
  try {
    const response = await draftnik.get(`/draft/detail/${draftCode}/`);

    dispatch({ type: LOAD_TEAM_DATA, payload: response.data });
    dispatch({ type: LOAD_PLAYER_DATA, payload: response.data });
    dispatch({ type: LOAD_GAMEWEEK_DATA, payload: response.data });
    dispatch({ type: LOAD_FIXTURES_DATA, payload: response.data });
    dispatch({ type: LOAD_SINGLE_DRAFT, payload: response.data });

    dispatch(setCurrentGameweek(response.data.static.current_gameweek));
    const gameweek = response.data.draft.gameweek;
    dispatch(selectGameweek(gameweek));
    dispatch(selectDraft(0));
  } catch (error) {
    console.error(error);
    if (error.response?.status === 404) {
      history.push("/draft/not-found");
    }
  }
};

export const setCurrentGameweek = (currentGameweek) => {
  return { type: SET_CURRENT_GAMEWEEK, payload: { currentGameweek } };
};

export const selectGameweek = (gameweek) => {
  return { type: SELECT_GAMEWEEK, payload: { gameweek } };
};

export const selectDraft = (draft) => {
  return { type: SELECT_DRAFT, payload: { draft } };
};

export const selectDraftById = (draftId) => {
  return (dispatch, getState) => {
    const selectedDraft = getState().drafts.byId?.[draftId];
    const draftGameweek = selectedDraft?.gameweek;
    dispatch(selectGameweek(draftGameweek));

    const drafts = getState().drafts[draftGameweek];
    const draftIndex = _.findIndex(drafts, (draft) => draft.id === draftId);
    dispatch(selectDraft(draftIndex));
  };
};

export const resetDraftSelection = () => {
  return (dispatch, getState) => {
    const currentGameweek = getState().selected.currentGameweek;

    dispatch(selectDraft(null));
    dispatch(selectGameweek(currentGameweek));
  };
};

export const selectCollection = (collectionId) => {
  return { type: SELECT_COLLECTION, payload: { collectionId } };
};

export const selectCollectionDraft = (draftKey) => {
  return {
    type: SELECT_COLLECTION_DRAFT,
    payload: { collectionDraftKey: draftKey },
  };
};

export const deleteDraft = (draft) => async (dispatch) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
  try {
    dispatch(startDeleteRequest());
    // await draftnik.delete(`/draft/${draft.id}/`, {
    //   headers: {
    //     Authorization: `Token ${authToken}`,
    //   },
    // });

    dispatch({ type: DELETE_DRAFT, payload: draft });
    dispatch({ type: DELETE_COLLECTION_DRAFT, payload: { draftId: draft.id } });
    dispatch(selectDraft(null));
    dispatch(stopDeleteRequest());
    dispatch(closeDeleteModal());
  } catch (error) {
    console.error(error);
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    }
  }
};

export const renameDraft = (draft, name) => async (dispatch) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
  try {
    dispatch(startRenameRequest());
    await draftnik.put(
      `/draft/${draft.id}/`,
      { name },
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    dispatch({ type: RENAME_DRAFT, payload: { draft, name } });
    dispatch(closeRenameModal());
  } catch (error) {
    console.error(error);
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    } else {
      dispatch(setRenameRequestError(error.response?.data));
    }
  } finally {
    dispatch(stopRenameRequest());
  }
};

export const moveDraft =
  (draft, originalGameweek, gameweek) => async (dispatch) => {
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
    try {
      dispatch(startMoveRequest());
      const response = await draftnik.put(
        `/draft/${draft.id}/`,
        { gameweek: gameweek || null },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      dispatch(selectDraft(null));
      dispatch({
        type: MOVE_DRAFT,
        payload: { draft, originalGameweek, gameweek: response.data.gameweek },
      });
      dispatch(stopMoveRequest());
      dispatch(closeMoveModal());
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        localStorage.removeItem(AUTH_TOKEN_FIELD);
        history.push("/signin");
      }
    }
  };

export const startStaticLoading = () => {
  return { type: START_LOADING_STATIC_DATA };
};

export const stopStaticLoading = () => {
  return { type: STOP_LOADING_STATIC_DATA };
};

export const openRenameModal = (draft) => {
  return { type: OPEN_RENAME_MODAL, payload: { draft } };
};

export const startRenameRequest = () => {
  return { type: START_RENAME_REQUEST };
};

export const stopRenameRequest = () => {
  return { type: STOP_RENAME_REQUEST };
};

export const setRenameRequestError = (error) => {
  return { type: SET_RENAME_REQUEST_ERROR, payload: { error } };
};

export const closeRenameModal = () => {
  return { type: CLOSE_RENAME_MODAL };
};

export const openMoveModal = (draft) => {
  return { type: OPEN_MOVE_MODAL, payload: { draft } };
};

export const startMoveRequest = () => {
  return { type: START_MOVE_REQUEST };
};

export const stopMoveRequest = () => {
  return { type: STOP_MOVE_REQUEST };
};

export const closeMoveModal = () => {
  return { type: CLOSE_MOVE_MODAL };
};

export const openDeleteModal = (draft) => {
  return { type: OPEN_DELETE_MODAL, payload: { draft } };
};

export const startDeleteRequest = () => {
  return { type: START_DELETE_REQUEST };
};

export const stopDeleteRequest = () => {
  return { type: STOP_DELETE_REQUEST };
};

export const closeDeleteModal = () => {
  return { type: CLOSE_DELETE_MODAL };
};

export const openShareModal = (draft) => {
  return { type: OPEN_SHARE_MODAL, payload: { draft } };
};

export const closeShareModal = () => {
  return { type: CLOSE_SHARE_MODAL };
};
