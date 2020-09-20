import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getTimeString } from "../../utils/datetime";

const styles = (theme) => ({});

class Fixture extends React.Component {
  getTeamDetails = (teamCode) => {
    const { teams } = this.props;
    const team = teams[teamCode];

    return {
      shortName: team.short_name,
      badge: `/badges/${teamCode}.png`,
    };
  };

  render() {
    const { classes, fixture } = this.props;
    const home = this.getTeamDetails(fixture.home);
    const away = this.getTeamDetails(fixture.away);

    return (
      <ListItemText>{`${home.shortName} vs ${away.shortName} (${getTimeString(
        fixture.kickoff_time
      )})`}</ListItemText>
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
