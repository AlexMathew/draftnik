import _ from "lodash";
import { LOAD_FIXTURES_DATA } from "../actions/types";
import { getUSDateString } from "../utils/datetime";

const initialState = {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FIXTURES_DATA:
      return {
        ...state,
        byTeam: action.payload.static.team_fixtures,
        byGameweek: formatGwFixtures(action.payload.static.gameweek_fixtures),
      };
    default:
      return state;
  }
};
