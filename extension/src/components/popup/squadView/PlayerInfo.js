import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ElementInfo from "./ElementInfo";
import PitchElementFixtures from "./PitchElementFixtures";

const styles = (theme) => ({
  player: {
    display: "flex",
    flexGrow: 1,
  },
  details: {
    display: "flex",
    flexGrow: 1,
  },
  detailText: {
    fontSize: "small",
    fontWeight: "bold",
    textAlign: "center",
  },
});

class PlayerInfo extends React.Component {
  playerCost = (player) => {
    return `${(player.now_cost / 10).toString()}${
      player.now_cost % 10 === 0 ? ".0" : ""
    }`;
  };

  render() {
    const { classes, player, teams } = this.props;
    const team = teams[player.team];

    return (
      <div className={classes.player}>
        <div className={classes.details}>
          <ElementInfo player={player} />
          <Typography className={classes.detailText}>
            {player.web_name} ({team.short_name}) [{this.playerCost(player)}]
          </Typography>
        </div>
        <PitchElementFixtures player={player} />
      </div>
    );
  }
}

PlayerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
  };
};

const wrappedPlayerInfo = connect(mapStateToProps)(PlayerInfo);
export default withStyles(styles)(wrappedPlayerInfo);
