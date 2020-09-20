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
  details: {
    height: "3vh",
    display: "grid",
    placeContent: "center",
    placeItems: "center",
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignSelf: "center",
    alignItems: "baseline",
  },
  createdDate: {
    display: "flex",
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  draftName: {
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "small",
    },
  },
  userName: {
    color: "grey",
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      fontSize: "small",
    },
  },
  createdAt: {
    color: "grey",
    fontSize: "small",
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
  },
});

class SquadView extends React.Component {
  getDateString = (datetime) => {
    return new Date(datetime).toDateString();
  };

  render() {
    const {
      classes,
      drafts,
      selectedGameweek,
      selectedDraft,
      showUsername,
    } = this.props;
    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.details}>
          <div className={classes.title}>
            <Typography variant="h5" className={classes.draftName}>
              {draft ? draft.name : ""}
            </Typography>
            {showUsername ? (
              <Typography variant="h6" className={classes.userName}>
                {draft ? `(${draft.user})` : ""}
              </Typography>
            ) : null}
          </div>
          <div className={classes.createdDate}>
            <Typography variant="h6" className={classes.createdAt}>
              {draft
                ? `Created on: ${this.getDateString(draft.created_at)}`
                : ""}
            </Typography>
          </div>
        </div>
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
