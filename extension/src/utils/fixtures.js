import _ from "lodash";
import { getUSDateString } from "./datetime";

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

export { formatGwFixtures };
