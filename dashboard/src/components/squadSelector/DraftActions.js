import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import ShareDraftModal from "./ShareDraftModal";
import { connect } from "react-redux";
import {} from "../../actions";

const styles = () => ({
  menuButton: {
    borderRadius: "0%",
  },
});

class DraftActions extends React.Component {
  state = {
    share: {
      open: false,
      draft: {},
    },
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
          classes={{ root: classes.menuButton }}
          onClick={() => this.handleShareOpen(draft)}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
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
