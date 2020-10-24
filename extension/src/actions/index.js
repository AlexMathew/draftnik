import {
  LOAD_DRAFTS,
  LOAD_GAMEWEEK_DATA,
  LOAD_PLAYER_DATA,
  LOAD_TEAM_DATA,
  LOAD_FIXTURES_DATA,
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
} from "./types";
import draftnik from "../api/draftnik";
import { AUTH_TOKEN_FIELD, ACTIONS } from "../constants";

export const fetchStaticData = () => async (dispatch) => {
  chrome.storage.local.get([AUTH_TOKEN_FIELD], async (result) => {
    if (AUTH_TOKEN_FIELD in result) {
      const { auth_token } = result[[AUTH_TOKEN_FIELD]];
      if (auth_token !== undefined && auth_token !== null) {
        try {
          dispatch(startStaticLoading());
          const response = await draftnik.get("/draft/static/", {
            headers: {
              Authorization: `Token ${auth_token}`,
            },
          });
          console.log(response);

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
            chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
            chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
          }
        }
      } else {
        chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
        chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
      }
    } else {
      chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
      chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
    }
  });
};

export const selectDraft = (draft) => {
  return { type: SELECT_DRAFT, payload: { draft } };
};

export const selectGameweek = (gameweek) => {
  return { type: SELECT_GAMEWEEK, payload: { gameweek } };
};

export const startStaticLoading = () => {
  return { type: START_LOADING_STATIC_DATA };
};

export const stopStaticLoading = () => {
  return { type: STOP_LOADING_STATIC_DATA };
};
