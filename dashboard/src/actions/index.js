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
