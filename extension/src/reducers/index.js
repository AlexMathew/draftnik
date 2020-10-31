import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import playersReducer from "./playersReducer";
import gameweeksReducer from "./gameweeksReducer";
import fixturesReducer from "./fixturesReducer";
import draftsReducer from "./draftsReducer";
import selectionsReducer from "./selectionsReducer";
import loadingReducer from "./loadingReducer";
import transfersReducer from "./transfersReducer";

export default combineReducers({
  teams: teamsReducer,
  players: playersReducer,
  gameweeks: gameweeksReducer,
  fixtures: fixturesReducer,
  drafts: draftsReducer,
  selected: selectionsReducer,
  loading: loadingReducer,
  transfers: transfersReducer,
});
