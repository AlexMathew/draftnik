import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import _ from "lodash";
import PitchRow from "./PitchRow";
import { ELEMENT_TYPES } from "../../constants";

const styles = (theme) => ({
  elementsContainer: {
    paddingTop: theme.spacing(5),
  },
});

class SquadDisplay extends React.Component {
  render() {
    const {
      classes,
      drafts,
      players,
      selectedGameweek,
      selectedDraft,
    } = this.props;

    if (selectedDraft === null) {
      return null;
    }

    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;
    const squadPlayers = draft
      ? draft.entries.map((entry) => players[entry])
      : [];
    const elements = _.groupBy(squadPlayers, "element_type");

    return (
      <Container maxWidth="lg" className={classes.elementsContainer}>
        <PitchRow elements={elements[ELEMENT_TYPES.GOALKEEPERS]}></PitchRow>
        <PitchRow elements={elements[ELEMENT_TYPES.DEFENDERS]}></PitchRow>
        <PitchRow elements={elements[ELEMENT_TYPES.MIDFIELDERS]}></PitchRow>
        <PitchRow elements={elements[ELEMENT_TYPES.FORWARDS]}></PitchRow>
      </Container>
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
  };
};

const wrappedSquadDisplay = connect(mapStateToProps)(SquadDisplay);
export default withStyles(styles)(wrappedSquadDisplay);
