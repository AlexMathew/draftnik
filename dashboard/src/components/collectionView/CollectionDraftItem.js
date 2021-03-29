import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";
import { selectDraft, selectGameweek, switchMobile } from "../../actions";

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class CollectionDraftItem extends React.Component {
  selectDraft = () => {
    const { draft } = this.props;
    this.props.selectGameweek(draft.gameweek);
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw < this.props.theme.breakpoints.values.lg) {
      this.props.switchMobile();
    }
  };

  render() {
    const { classes, draft } = this.props;

    return (
      <ListItem button onClick={this.selectDraft}>
        <ListItemText primary={draft.name} />
        <ChevronRightIcon />
      </ListItem>
    );
  }
}

CollectionDraftItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const wrappedCollectionDraftItem = connect(mapStateToProps, {
  selectDraft,
  selectGameweek,
  switchMobile,
})(CollectionDraftItem);
export default withTheme(withStyles(styles)(wrappedCollectionDraftItem));
