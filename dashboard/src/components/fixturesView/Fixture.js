import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getTimeString } from "../../utils/datetime";

const styles = (theme) => ({
  badge: {
    [theme.breakpoints.down("sm")]: {
      height: "2vh",
    },
    height: "4vh",
  },
  kickoff: {
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: "thin",
  },
});

class Fixture extends React.Component {
  getTeamDetails = (teamCode) => {
    const { teams } = this.props;
    const team = teams[teamCode];

    return {
      name: team.name,
      shortName: team.short_name,
      badge: `/badges/${teamCode}.png`,
    };
  };

  render() {
    const { classes, fixture } = this.props;
    const home = this.getTeamDetails(fixture.home);
    const away = this.getTeamDetails(fixture.away);

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs>
          <img className={classes.badge} src={home.badge} alt={home.name}></img>
        </Grid>
        <Grid item xs className={classes.kickoff}>
          {getTimeString(fixture.kickoff_time)}
        </Grid>
        <Grid item xs>
          <img className={classes.badge} src={away.badge} alt={away.name}></img>
        </Grid>
      </Grid>
    );
  }
}

Fixture.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
  };
};

const wrappedFixture = connect(mapStateToProps)(Fixture);
export default withStyles(styles)(wrappedFixture);
