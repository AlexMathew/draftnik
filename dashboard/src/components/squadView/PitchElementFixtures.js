import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import _ from "lodash";

const styles = (theme) => ({
  fixtures: {
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
    fontWeight: "bold",
    fontSize: "small",
    textAlign: "center",
    background: "whitesmoke",
  },
  gwFixture: {
    width: "30%",
  },
  strength1: {
    background: "white",
    color: "black",
  },
  strength2: {
    background: "#00ff86",
    color: "black",
  },
  strength3: {
    background: "#ebebe4",
    color: "black",
  },
  strength4: {
    background: "#ff0059",
    color: "white",
  },
  strength5: {
    background: "#861d45",
    color: "white",
  },
});

class PitchElementFixtures extends React.Component {
  getNextFixtures = (count) => {
    const selectedGameweek = parseInt(this.props.selectedGameweek);
    const gwKeys = _.range(selectedGameweek, selectedGameweek + count);
    const teamFixtures = this.props.teamFixtures[this.props.element.team];
    var defaultValues = _(gwKeys)
      .mapKeys()
      .mapValues(function () {
        return null;
      })
      .value();
    const fixtures = _(teamFixtures)
      .pick(gwKeys)
      .defaults(defaultValues)
      .value();

    return fixtures;
  };

  getFixturesGrid = (count) => {
    const { classes, element, teams } = this.props;

    return _.values(this.getNextFixtures(count)).map((gwFixtures, index) => (
      <Grid
        item
        xs
        className={classes.gwFixture}
        key={`${element.id}_${index}`}
      >
        <Grid container direction="column">
          {gwFixtures
            ? gwFixtures.map((fixture) => (
                <Grid
                  item
                  xs
                  key={`${element.id}_${fixture.gw}-${fixture.opponent}${fixture.location}`}
                  classes={{
                    item:
                      classes[`strength${teams[fixture.opponent].strength}`],
                  }}
                >
                  {`${teams[fixture.opponent].short_name} (${
                    fixture.location
                  })`}
                </Grid>
              ))
            : "-"}
        </Grid>
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" className={classes.fixtures}>
        <Hidden smUp implementation="js">
          {this.getFixturesGrid(1)}
        </Hidden>
        <Hidden xsDown implementation="js">
          {this.getFixturesGrid(3)}
        </Hidden>
      </Grid>
    );
  }
}

PitchElementFixtures.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    teamFixtures: state.fixtures.byTeam,
    selectedGameweek: state.selected.gameweek,
  };
};

const wrappedPitchElementFixtures = connect(mapStateToProps)(
  PitchElementFixtures
);
export default withStyles(styles)(wrappedPitchElementFixtures);
