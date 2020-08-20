import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { connect } from "react-redux";
import { selectDraft, switchMobile } from "../../actions";

const styles = () => ({
  selected: {
    background: "whitesmoke",
    color: "blue",
  },
});

class DraftList extends React.Component {
  selectDraft = (index) => {
    this.props.selectDraft(index);
    this.props.switchMobile();
  };

  isSelectedDraft = (index) => {
    return index === this.props.selectedDraft;
  };

  render() {
    const { classes, drafts, selectedGameweek } = this.props;

    return (
      <List>
        {selectedGameweek in drafts ? (
          drafts[selectedGameweek].map((draft, index) => (
            <ListItem
              button
              key={index}
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
          ))
        ) : (
          <ListItem>No saved drafts for this gameweek</ListItem>
        )}
      </List>
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
