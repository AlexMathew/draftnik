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
    const { classes } = this.props;

    return (
      <div>
        {this.props.drafts[this.props.selectedDraft].entries.map(
          (entry, index) => (
            <div key={index}>{this.displaySquadEntry(entry)}</div>
          )
        )}
      </div>
    );
  }
}

SquadDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    drafts: state.drafts.drafts,
    selectedDraft: state.drafts.selected,
    players: state.players,
    teams: state.teams,
  };
};

const wrappedSquadDisplay = connect(mapStateToProps)(SquadDisplay);
export default withStyles(styles)(wrappedSquadDisplay);
