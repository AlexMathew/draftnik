import _ from "lodash";
import { LOAD_FIXTURES_DATA, RESET_DATA } from "../actions/types";
import { getUSDateString } from "../utils/datetime";

const INITIAL_STATE = {
  byTeam: {},
  byGameweek: {},
};

const formatGwFixtures = (fixtures) => {
  const newFixtures = {};
  // eslint-disable-next-line array-callback-return
  _.toPairs(fixtures).map(([gw, fixs]) => {
    newFixtures[gw] = _.groupBy(fixs, (fix) =>
      getUSDateString(fix.kickoff_time)
    );
  });
  return newFixtures;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_FIXTURES_DATA:
      return {
        ...state,
        byTeam: action.payload.static.team_fixtures,
        byGameweek: formatGwFixtures(action.payload.static.gameweek_fixtures),
      };
    case RESET_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
};
