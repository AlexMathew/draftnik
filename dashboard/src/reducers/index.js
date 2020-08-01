import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import gameweeksReducer from "./gameweeksReducer";
import draftsReducer from "./draftsReducer";
import selectionsReducer from "./selectionsReducer";
import responsiveReducer from "./responsiveReducer";

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer,
  gameweeks: gameweeksReducer,
  drafts: draftsReducer,
  selected: selectionsReducer,
  responsive: responsiveReducer,
});
