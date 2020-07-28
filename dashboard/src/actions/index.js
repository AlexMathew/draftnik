import { LOAD_DRAFTS, LOAD_PLAYER_DATA, LOAD_TEAM_DATA } from "./types";
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
    dispatch({ type: LOAD_DRAFTS, payload: response.data });
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    }
  }
};
