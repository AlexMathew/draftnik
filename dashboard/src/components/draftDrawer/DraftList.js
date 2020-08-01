import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { selectDraft } from "../../actions";

const styles = () => ({});

class DraftList extends React.Component {
  render() {
    const {
      //   classes,
      drafts,
      selectedGameweek,
      selectDraft,
    } = this.props;

    return (
      <List>
        {selectedGameweek in drafts
          ? drafts[selectedGameweek].map((draft, index) => (
              <ListItem button key={index} onClick={() => selectDraft(index)}>
                <ListItemText primary={draft.name} />
              </ListItem>
            ))
          : ""}
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
    drafts: state.drafts,
  };
};

const wrappedDraftList = connect(mapStateToProps, {
  selectDraft,
})(DraftList);
export default withStyles(styles)(wrappedDraftList);
