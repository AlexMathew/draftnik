import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { connect } from "react-redux";
import { selectDraft } from "../../../actions";

const styles = () => ({
  selected: {
    background: "whitesmoke",
    color: "blue",
  },
  draft: {
    display: "flex",
    flexGrow: 1,
  },
  draftName: {
    fontSize: "small",
  },
  noDrafts: {
    fontSize: "small",
  },
  menu: {
    alignSelf: "center",
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
  };

  isSelectedDraft = (index) => {
    return index === this.props.selectedDraft;
  };

  render() {
    const { classes, drafts, selectedGameweek } = this.props;

    return (
      <>
        <List>
          {selectedGameweek in drafts &&
          drafts[selectedGameweek].length !== 0 ? (
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
                  <ListItemText
                    primary={draft.name}
                    classes={{ primary: classes.draftName }}
                  />
                  <ChevronRightIcon fontSize="small" />
                </ListItem>
              </div>
            ))
          ) : (
            <ListItem className={classes.noDrafts}>
              No saved drafts for this gameweek
            </ListItem>
          )}
        </List>
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
})(DraftList);
export default withTheme(withStyles(styles)(wrappedDraftList));
