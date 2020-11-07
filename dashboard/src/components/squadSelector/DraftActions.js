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
import DateRangeIcon from "@material-ui/icons/DateRange";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import RenameDraftModal from "./actionModals/RenameDraftModal";
import ShareDraftModal from "./actionModals/ShareDraftModal";
import DeleteDraftModal from "./actionModals/DeleteDraftModal";
import { connect } from "react-redux";
import {
  openDeleteModal,
  openRenameModal,
  openShareModal,
} from "../../actions";

const styles = () => ({
  menuButton: {
    borderRadius: "0%",
  },
});

class DraftActions extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenuClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
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
              this.props.openRenameModal(draft);
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
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <DateRangeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Change Gameweek" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.openShareModal(draft);
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
              this.props.openDeleteModal(draft);
              this.handleMenuClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
        <RenameDraftModal />
        <ShareDraftModal />
        <DeleteDraftModal />
      </>
    );
  }
}

DraftActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedDraftActions = connect(null, {
  openDeleteModal,
  openRenameModal,
  openShareModal,
})(DraftActions);
export default withStyles(styles)(wrappedDraftActions);
