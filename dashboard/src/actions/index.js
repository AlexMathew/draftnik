import {
  LOAD_DRAFTS,
  LOAD_SINGLE_DRAFT,
  LOAD_GAMEWEEK_DATA,
  LOAD_PLAYER_DATA,
  LOAD_TEAM_DATA,
  LOAD_FIXTURES_DATA,
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SWITCH_MOBILE,
  DELETE_DRAFT,
  RENAME_DRAFT,
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
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

    dispatch(selectDraft(null));
    dispatch(selectGameweek(response.data.static.current_gameweek));
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

export const selectDraft = (draft) => {
  return { type: SELECT_DRAFT, payload: { draft } };
};

export const selectGameweek = (gameweek) => {
  return { type: SELECT_GAMEWEEK, payload: { gameweek } };
};

export const deleteDraft = (draft) => async (dispatch) => {
  const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
  try {
    await draftnik.delete(`/draft/${draft.id}/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    dispatch({ type: DELETE_DRAFT, payload: draft });
    dispatch(selectDraft(null));
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
