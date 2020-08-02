import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import _ from "lodash";

const styles = () => ({
  fixtures: {
    fontWeight: "bold",
    fontSize: "small",
    textAlign: "center",
    background: "whitesmoke",
  },
  gwFixture: {
    width: "30%",
  },
});

class PitchElementFixtures extends React.Component {
  render() {
    const { classes, element, teams, teamFixtures } = this.props;
    const selectedGameweek = parseInt(this.props.selectedGameweek);
    const fixtures = _.pick(
      teamFixtures[element.team],
      _.range(selectedGameweek, selectedGameweek + 3)
    );

    return (
      <Grid container direction="row" className={classes.fixtures}>
        {_.values(fixtures).map((gwFixtures, index) => (
          <Grid
            item
            xs
            className={classes.gwFixture}
            key={`${element.id}_${index}`}
          >
            {gwFixtures
              .map(
                (fixture) =>
                  `${teams[fixture.opponent].short_name} (${fixture.location})`
              )
              .join(" | ")}
          </Grid>
        ))}
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
