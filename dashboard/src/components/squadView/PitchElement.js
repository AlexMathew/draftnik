import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import _ from "lodash";
import { ELEMENT_TYPES } from "../../constants";

const styles = (theme) => ({
  element: {
    width: "15%",
  },
  jerseyContainer: {
    textAlign: "center",
  },
  jersey: {
    [theme.breakpoints.up("lg")]: {
      height: "8vh",
    },
    height: "5vh",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    background: "darkgreen",
    color: "white",
  },
  price: {
    fontWeight: "bold",
    textAlign: "center",
    background: "palegreen",
  },
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

class PitchElement extends React.Component {
  jerseyUrl = (element) => {
    const isGk = element.element_type === ELEMENT_TYPES.GOALKEEPERS;
    return `jerseys/${isGk ? "gk" : "out"}/${element.team}.png`;
  };

  render() {
    const { classes, element, teams, teamFixtures } = this.props;
    const selectedGameweek = parseInt(this.props.selectedGameweek);
    const team = teams[element.team];
    const fixtures = _.pick(
      teamFixtures[element.team],
      _.range(selectedGameweek, selectedGameweek + 3)
    );

    return (
      <Grid className={classes.element}>
        <Grid item className={classes.jerseyContainer}>
          <img
            className={classes.jersey}
            src={this.jerseyUrl(element)}
            alt={team.name}
          />
        </Grid>
        <Grid item xs>
          <Typography className={classes.name}>
            {element.web_name} ({team.short_name})
          </Typography>
          <Typography className={classes.price}>
            {element.now_cost / 10}
          </Typography>
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
                      `${teams[fixture.opponent].short_name} (${
                        fixture.location
                      })`
                  )
                  .join(" | ")}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PitchElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    teamFixtures: state.fixtures.byTeam,
    selectedGameweek: state.selected.gameweek,
  };
};

const wrappedPitchElement = connect(mapStateToProps)(PitchElement);
export default withStyles(styles)(wrappedPitchElement);
