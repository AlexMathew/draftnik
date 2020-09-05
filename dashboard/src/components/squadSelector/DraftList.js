import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import ShareDraftModal from "./ShareDraftModal";
import clsx from "clsx";
import { connect } from "react-redux";
import { selectDraft, switchMobile } from "../../actions";

const styles = () => ({
  selected: {
    background: "whitesmoke",
    color: "blue",
  },
  draft: {
    display: "flex",
  },
  shareButton: {
    borderRadius: "0%",
  },
});

class DraftList extends React.Component {
  state = {
    share: {
      open: false,
      draft: {},
    },
  };

  selectDraft = (index) => {
    this.props.selectDraft(index);
    this.props.switchMobile();
  };

  isSelectedDraft = (index) => {
    return index === this.props.selectedDraft;
  };

  handleShareOpen = (draft) => {
    this.setState({
      share: {
        open: true,
        draft: draft,
      },
    });
  };

  handleShareClose = () => {
    this.setState({
      share: {
        open: false,
        draft: {},
      },
    });
  };

  render() {
    const { classes, drafts, selectedGameweek } = this.props;

    return (
      <>
        <List>
          {selectedGameweek in drafts ? (
            drafts[selectedGameweek].map((draft, index) => (
              <div key={index} className={classes.draft}>
                <ListItem
                  button
                  onClick={() => this.selectDraft(index)}
                  classes={{
                    root: clsx({
                      [classes.selected]: this.isSelectedDraft(index),
                    }),
                  }}
                >
                  <ListItemText primary={draft.name} />
                  <ChevronRightIcon />
                </ListItem>
                <IconButton
                  classes={{ root: classes.shareButton }}
                  onClick={() => this.handleShareOpen(draft)}
                >
                  <ShareIcon fontSize="small" />
                </IconButton>
              </div>
            ))
          ) : (
            <ListItem>No saved drafts for this gameweek</ListItem>
          )}
        </List>
        <ShareDraftModal
          state={this.state.share}
          handleClose={this.handleShareClose}
        />
      </>
    );
  }
}

DraftList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameweeks: state.gameweeks,
    selectedGameweek: state.selected.gameweek,
    selectedDraft: state.selected.draft,
    drafts: state.drafts,
  };
};

const wrappedDraftList = connect(mapStateToProps, {
  selectDraft,
  switchMobile,
})(DraftList);
export default withStyles(styles)(wrappedDraftList);
