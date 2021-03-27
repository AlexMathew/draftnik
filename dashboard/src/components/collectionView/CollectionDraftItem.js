import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class CollectionDraftItem extends React.Component {
  render() {
    const { classes, draft } = this.props;

    return (
      <ListItem button>
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

const wrappedCollectionDraftItem = connect(
  mapStateToProps,
  {}
)(CollectionDraftItem);
export default withStyles(styles)(wrappedCollectionDraftItem);
