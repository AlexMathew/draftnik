import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
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
  fixture: {
    fontWeight: "bold",
    textAlign: "center",
    background: "whitesmoke",
  },
});

class PitchElement extends React.Component {
  jerseyUrl = (element) => {
    const isGk = element.element_type === ELEMENT_TYPES.GOALKEEPERS;
    return `jerseys/${isGk ? "gk" : "out"}/${element.team}.png`;
  };

  render() {
    const {
      classes,
      element,
      teams,
      selectedGameweek,
      teamFixtures,
    } = this.props;
    const team = teams[element.team];
    const fixtures = teamFixtures[element.team][selectedGameweek];

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
          <Typography className={classes.fixture}>
            {fixtures.map(
              (fixture) =>
                `${teams[fixture.opponent].short_name} (${fixture.location})`
            )}
          </Typography>
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
