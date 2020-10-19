import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import gameweeksReducer from "./gameweeksReducer";
import fixturesReducer from "./fixturesReducer";
import draftsReducer from "./draftsReducer";
import selectionsReducer from "./selectionsReducer";
import responsiveReducer from "./responsiveReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer,
  gameweeks: gameweeksReducer,
  fixtures: fixturesReducer,
  drafts: draftsReducer,
  selected: selectionsReducer,
  responsive: responsiveReducer,
  loading: loadingReducer,
});
