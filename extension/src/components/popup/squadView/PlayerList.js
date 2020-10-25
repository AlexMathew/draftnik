import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import _ from "lodash";
import PlayerInfo from "./PlayerInfo";

const styles = (theme) => ({
  draft: {
    height: "80vh",
    paddingTop: theme.spacing(3),
  },
  player: {
    height: "5vh",
  },
});

class PlayerList extends React.Component {
  render() {
    const { classes, draft, players } = this.props;
    const squadPlayers = _.sortBy(
      draft.entries.map((player) => players[player]),
      "element_type"
    );

    return (
      <div className={classes.draft}>
        <List>
          {Object.keys(squadPlayers).map((key) => {
            const player = squadPlayers[key];

            return (
              <ListItem key={player.id} className={classes.player} divider>
                <PlayerInfo player={player} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

PlayerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    players: state.players,
  };
};

const wrappedPlayerList = connect(mapStateToProps)(PlayerList);
export default withStyles(styles)(wrappedPlayerList);
