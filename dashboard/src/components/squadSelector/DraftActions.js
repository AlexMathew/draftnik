import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import ShareDraftModal from "./actionModals/ShareDraftModal";
import { connect } from "react-redux";
import {} from "../../actions";

const styles = () => ({
  menuButton: {
    borderRadius: "0%",
  },
});

class DraftActions extends React.Component {
  state = {
    anchorEl: null,
    share: {
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
    const { classes, draft } = this.props;

    return (
      <div>
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
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              this.handleShareOpen(draft);
            }}
          >
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Share Draft" />
          </MenuItem>
        </Menu>
        <ShareDraftModal
          state={this.state.share}
          handleClose={this.handleShareClose}
        />
      </div>
    );
  }
}

DraftActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const wrappedDraftActions = connect(mapStateToProps, {})(DraftActions);
export default withStyles(styles)(wrappedDraftActions);
