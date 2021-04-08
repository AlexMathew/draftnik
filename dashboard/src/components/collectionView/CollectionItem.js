import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CollectionDraftItem from "./CollectionDraftItem";
import clsx from "clsx";
import { connect } from "react-redux";
import { selectCollection } from "../../actions";

const styles = (theme) => ({
  selected: {
    background: "whitesmoke",
    color: "blue",
  },
});

class CollectionItem extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  isSelectedCollection = () => {
    return this.props.collection.id === this.props.selectedCollection;
  };

  selectCollection = () => {
    this.props.selectCollection(this.props.collection.id);
  };

  render() {
    const { classes, collection } = this.props;

    return (
      <>
        <ListItem
          button
          onClick={this.handleClick}
          classes={{
            root: clsx({
              [classes.selected]: this.isSelectedCollection(),
            }),
          }}
        >
          <ListItemIcon>
            {this.state.open ? <FolderOpenIcon /> : <FolderIcon />}
          </ListItemIcon>
          <ListItemText primary={collection.name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {collection.drafts.map((draft) => {
              const key = `${collection.id}_${draft.id}`;
              return (
                <CollectionDraftItem
                  key={key}
                  draftKey={key}
                  draft={draft}
                  selectCollection={this.selectCollection}
                />
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }
}

CollectionItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedCollection: state.selected.collectionId,
  };
};

const wrappedCollectionItem = connect(mapStateToProps, { selectCollection })(
  CollectionItem
);
export default withStyles(styles)(wrappedCollectionItem);
