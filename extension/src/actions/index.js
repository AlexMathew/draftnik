import {
  RESET_DATA,
  LOAD_DRAFTS,
  LOAD_GAMEWEEK_DATA,
  LOAD_PLAYER_DATA,
  LOAD_TEAM_DATA,
  LOAD_FIXTURES_DATA,
  SELECT_DRAFT,
  SELECT_GAMEWEEK,
  SET_CURRENT_GAMEWEEK,
  START_LOADING_STATIC_DATA,
  STOP_LOADING_STATIC_DATA,
  INDICATE_REFRESH,
  CLEAR_REFRESH,
} from "./types";
import draftnik from "../api/draftnik";
import { AUTH_TOKEN_FIELD, ACTIONS, STATIC_DATA_FIELD } from "../constants";

const getStaticDataFromStorage = async () => {
  const storage = new Promise((resolve, reject) => {
    chrome.storage.local.get([STATIC_DATA_FIELD], async (result) => {
      if (STATIC_DATA_FIELD in result) {
        resolve(result[[STATIC_DATA_FIELD]]);
      } else {
        reject();
      }
    });
  });

  return await storage;
};

const getStaticDataFromAPI = async () => {
  const draftnikApi = new Promise((resolve, reject) => {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], async (result) => {
      if (AUTH_TOKEN_FIELD in result) {
        const { auth_token } = result[[AUTH_TOKEN_FIELD]];
        if (auth_token !== undefined && auth_token !== null) {
          try {
            const response = await draftnik.get("/draft/static/", {
              headers: {
                Authorization: `Token ${auth_token}`,
              },
            });
            chrome.storage.local.set({
              [STATIC_DATA_FIELD]: { data: response.data },
            });

            resolve(response);
          } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
              reject("UNAUTHORIZED");
            }
          }
        } else {
          reject("UNAUTHORIZED");
        }
      } else {
        reject("UNAUTHORIZED");
      }
    });
  });

  return await draftnikApi;
};

const getStaticDataFromStorageOrAPI = async (force = false) => {
  try {
    if (force) {
      return await getStaticDataFromAPI();
    } else {
      return await getStaticDataFromStorage();
    }
  } catch (error) {
    return await getStaticDataFromAPI();
  }
};

export const fetchStaticData = (force = false) => async (dispatch) => {
  try {
    dispatch(startStaticLoading());

    const response = await getStaticDataFromStorageOrAPI(force);
    dispatch({ type: LOAD_TEAM_DATA, payload: response.data });
    dispatch({ type: LOAD_PLAYER_DATA, payload: response.data });
    dispatch({ type: LOAD_GAMEWEEK_DATA, payload: response.data });
    dispatch({ type: LOAD_FIXTURES_DATA, payload: response.data });
    dispatch({ type: LOAD_DRAFTS, payload: response.data });

    dispatch(setCurrentGameweek(response.data.static.current_gameweek));
    dispatch(resetDraftSelection());
    dispatch(stopStaticLoading());

    if (force) {
      dispatch(clearRefresh());
    }
  } catch (err) {
    if (err === "UNAUTHORIZED") {
      chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
      chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
    }
  }
};

export const resetData = () => {
  chrome.storage.local.remove([STATIC_DATA_FIELD]);
  return { type: RESET_DATA };
};

export const selectDraft = (draft) => {
  return { type: SELECT_DRAFT, payload: { draft } };
};

export const selectGameweek = (gameweek) => {
  return { type: SELECT_GAMEWEEK, payload: { gameweek } };
};

export const setCurrentGameweek = (currentGameweek) => {
  return { type: SET_CURRENT_GAMEWEEK, payload: { currentGameweek } };
};

export const resetDraftSelection = () => {
  return (dispatch, getState) => {
    const currentGameweek = getState().selected.currentGameweek;
    console.log(currentGameweek);

    dispatch(selectDraft(null));
    dispatch(selectGameweek(currentGameweek));
  };
};

export const startStaticLoading = () => {
  return { type: START_LOADING_STATIC_DATA };
};

export const stopStaticLoading = () => {
  return { type: STOP_LOADING_STATIC_DATA };
};

export const indicateRefresh = () => {
  return { type: INDICATE_REFRESH };
};

export const clearRefresh = () => {
  return { type: CLEAR_REFRESH };
};
