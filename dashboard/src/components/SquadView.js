import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Pitch from "./squadView/Pitch";

const styles = (theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
  title: {
    display: "flex",
    justifyContent: "center",
    height: "3vh",
    fontWeight: "bold",
  },
});

class SquadView extends React.Component {
  render() {
    const { classes, drafts, selectedGameweek, selectedDraft } = this.props;
    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h5" className={classes.title}>
          {draft ? draft.name : ""}
        </Typography>
        <Pitch />
      </main>
    );
  }
}

SquadView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    drafts: state.drafts,
    selectedGameweek: state.selected.gameweek,
    selectedDraft: state.selected.draft,
  };
};

const wrappedSquadView = connect(mapStateToProps)(SquadView);
export default withStyles(styles)(wrappedSquadView);
