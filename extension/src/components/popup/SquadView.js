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
    marginLeft: theme.spacing(30),
  },
  placeholder: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    fontSize: "large",
    fontWeight: "bold",
    height: "82vh",
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

  placeholderText = () => {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.placeholder}>Select a draft to view.</div>
      </main>
    );
  };

  render() {
    const {
      classes,
      drafts,
      selectedGameweek,
      selectedDraft,
      showUsername,
    } = this.props;

    if (selectedDraft === null) {
      return this.placeholderText();
    }

    const draft = drafts[selectedGameweek][selectedDraft];

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.details}>
          <div className={classes.title}>
            <Typography variant="h5" className={classes.draftName}>
              {draft.name}
            </Typography>
            {showUsername ? (
              <Typography variant="h6" className={classes.userName}>
                {`(${draft.user})`}
              </Typography>
            ) : null}
          </div>
          <div className={classes.createdDate}>
            <Typography variant="h6" className={classes.createdAt}>
              {`Created on: ${this.getDateString(draft.created_at)}`}
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
