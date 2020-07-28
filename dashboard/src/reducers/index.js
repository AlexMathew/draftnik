import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import draftsReducer from "./draftsReducer";

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer,
  drafts: draftsReducer,
});
