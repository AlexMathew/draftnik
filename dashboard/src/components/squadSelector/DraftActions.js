import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import RenameDraftModal from "./actionModals/RenameDraftModal";
import ShareDraftModal from "./actionModals/ShareDraftModal";
import DeleteDraftModal from "./actionModals/DeleteDraftModal";

const styles = () => ({
  menuButton: {
    borderRadius: "0%",
  },
});

class DraftActions extends React.Component {
  state = {
    anchorEl: null,
    rename: {
      open: false,
      draft: {},
    },
    share: {
      open: false,
      draft: {},
    },
    delete: {
      open: false,
      draft: {},
    },
  };

  handleMenuClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRenameOpen = (draft) => {
    this.setState({
      rename: {
        open: true,
        draft: draft,
      },
    });
  };

  handleRenameClose = () => {
    this.setState({
      rename: {
        open: false,
        draft: {},
      },
    });
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

  handleDeleteOpen = (draft) => {
    this.setState({
      delete: {
        open: true,
        draft: draft,
      },
    });
  };

  handleDeleteClose = () => {
    this.setState({
      delete: {
        open: false,
        draft: {},
      },
    });
  };

  render() {
    const { classes, draft } = this.props;

    return (
      <>
        <IconButton
          aria-label="menu"
          aria-controls="draft-menu"
          aria-haspopup="true"
          classes={{ root: classes.menuButton }}
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="draft-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              this.handleRenameOpen(draft);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleShareOpen(draft);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Share" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleDeleteOpen(draft);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
        <RenameDraftModal
          state={this.state.rename}
          handleClose={this.handleRenameClose}
        />
        <ShareDraftModal
          state={this.state.share}
          handleClose={this.handleShareClose}
        />
        <DeleteDraftModal
          state={this.state.delete}
          handleClose={this.handleDeleteClose}
        />
      </>
    );
  }
}

DraftActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DraftActions);
