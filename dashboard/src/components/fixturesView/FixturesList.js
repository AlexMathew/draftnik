import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import FixtureDay from "./FixtureDay";
import { getDateTimeString } from "../../utils/datetime";
import _ from "lodash";

const styles = (theme) => ({
  section: {
    display: "grid",
    alignSelf: "center",
    textAlign: "center",
  },
  header: {
    [theme.breakpoints.down("md")]: {
      fontSize: "large",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
    },
    fontSize: "x-large",
    paddingTop: theme.spacing(2),
    fontWeight: "bold",
  },
  deadline: {
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
    fontSize: "small",
  },
  info: {
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
    fontSize: "small",
    padding: theme.spacing(0.5),
  },
  fixtureDay: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
});

class FixturesList extends React.Component {
  render() {
    const { classes, gameweeks, gwFixtures, selectedGameweek } = this.props;
    const gameweek =
      selectedGameweek in gameweeks ? gameweeks[selectedGameweek] : null;
    const selectedGameweekFixtures =
      selectedGameweek in gwFixtures ? gwFixtures[selectedGameweek] : null;

    return (
      <>
        <div className={classes.section}>
          <Typography className={classes.header}>{gameweek?.name}</Typography>
        </div>
        <div className={classes.section}>
          <Typography className={classes.deadline}>
            {gameweek ? `${getDateTimeString(gameweek.deadline_time)}` : null}
          </Typography>
        </div>
        <Divider />
        <div className={classes.section}>
          <Typography className={classes.info}>
            (All times are shown in your local time)
          </Typography>
        </div>
        {selectedGameweekFixtures
          ? _.toPairs(selectedGameweekFixtures).map(
              ([fixtureDay, fixtures], index) => (
                <div key={index} className={classes.fixtureDay}>
                  <FixtureDay fixtureDay={fixtureDay} fixtures={fixtures} />
                </div>
              )
            )
          : null}
      </>
    );
  }
}

FixturesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameweeks: state.gameweeks,
    selectedGameweek: state.selected.gameweek,
    gwFixtures: state.fixtures.byGameweek,
  };
};

const wrappedFixturesList = connect(mapStateToProps)(FixturesList);
export default withStyles(styles)(wrappedFixturesList);
