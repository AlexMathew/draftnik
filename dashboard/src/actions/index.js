import {
  LOAD_DRAFTS,
  LOAD_GAMEWEEK_DATA,
  LOAD_PLAYER_DATA,
  LOAD_TEAM_DATA,
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
} from "./types";
import draftnik from "../api/draftnik";
import history from "../history";
import { AUTH_TOKEN_FIELD } from "../constants";

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
    dispatch({ type: LOAD_DRAFTS, payload: response.data });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    }
  }
};

export const selectDraft = (draft) => {
  return { type: SELECT_DRAFT, payload: { draft } };
};

export const selectGameweek = (gameweek) => {
  return { type: SELECT_GAMEWEEK, payload: { gameweek } };
};
