import _ from "lodash";
import { LOAD_FIXTURES_DATA } from "../actions/types";

const initialState = {
  byTeam: {},
  byGameweek: {},
};

const formatGwFixtures = (fixtures) => {
  const newFixtures = {};
  // eslint-disable-next-line array-callback-return
  _.toPairs(fixtures).map(([gw, fixs]) => {
    newFixtures[gw] = _.groupBy(fixs, (fix) =>
      new Date(fix.kickoff_time).toDateString()
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
