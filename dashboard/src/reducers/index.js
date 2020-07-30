import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import gameweeksReducer from "./gameweeksReducer";
import draftsReducer from "./draftsReducer";

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer,
  gameweeks: gameweeksReducer,
  drafts: draftsReducer,
});
