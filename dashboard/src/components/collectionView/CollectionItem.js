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
import { connect } from "react-redux";

const styles = (theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class CollectionItem extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, collection } = this.props;

    return (
      <>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            {this.state.open ? <FolderOpenIcon /> : <FolderIcon />}
          </ListItemIcon>
          <ListItemText primary={collection.name} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {collection.drafts.map((draft) => (
              <ListItem key={draft.id} button className={classes.nested}>
                <CollectionDraftItem draft={draft} />
              </ListItem>
            ))}
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
  return {};
};

const wrappedCollectionItem = connect(mapStateToProps, {})(CollectionItem);
export default withStyles(styles)(wrappedCollectionItem);
