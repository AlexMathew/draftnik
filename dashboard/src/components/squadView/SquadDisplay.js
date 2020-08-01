import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = (theme) => ({});

class SquadDisplay extends React.Component {
  displaySquadEntry = (entry) => {
    const player = this.props.players[entry];
    const team = this.props.teams[player.team];

    return (
      <Typography variant="h6" gutterBottom>
        {player.web_name} ({team.short_name})
      </Typography>
    );
  };

  render() {
    const {
      // classes,
      drafts,
      selectedGameweek,
      selectedDraft,
    } = this.props;
    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;

    return (
      <div>
        {draft.entries.map((entry, index) => (
          <div key={index}>{this.displaySquadEntry(entry)}</div>
        ))}
      </div>
    );
  }
}

SquadDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    drafts: state.drafts,
    selectedGameweek: state.selected.gameweek,
    selectedDraft: state.selected.draft,
    players: state.players,
    teams: state.teams,
  };
};

const wrappedSquadDisplay = connect(mapStateToProps)(SquadDisplay);
export default withStyles(styles)(wrappedSquadDisplay);
