import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const styles = (theme) => ({
  jerseyContainer: {
    textAlign: "center",
  },
  jersey: {
    [theme.breakpoints.up("lg")]: {
      height: "8vh",
    },
    height: "5vh",
  },
});

class PitchElement extends React.Component {
  render() {
    const { classes, element, teams } = this.props;
    const team = teams[element.team];

    return (
      <Grid direction="column" justify="center" alignItems="center">
        <Grid item xs className={classes.jerseyContainer}>
          <img
            className={classes.jersey}
            src={`jerseys/${team.id}.png`}
            alt={team.name}
          />
        </Grid>
        <Grid item xs>
          <Typography>
            {element.web_name} ({team.short_name})
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
  };
};

const wrappedPitchElement = connect(mapStateToProps)(PitchElement);
export default withStyles(styles)(wrappedPitchElement);
