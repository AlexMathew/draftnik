import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import MoveModalContent from "./moveDraft/MoveModalContent";
import { closeMoveModal } from "../../../actions";

const styles = (theme) => ({
  draftName: {
    display: "flex",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class MoveDraftModal extends React.Component {
  render() {
    const { classes, moveState, closeMoveModal } = this.props;
    const draft = moveState.draft;

    return (
      <Dialog
        open={moveState.modalOpen}
        onClose={closeMoveModal}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Move "{draft.name}"
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeMoveModal}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <MoveModalContent draft={draft} />
      </Dialog>
    );
  }
}

MoveDraftModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    moveState: state.loading.move,
  };
};

const wrappedMoveDraftModal = connect(mapStateToProps, {
  closeMoveModal,
})(MoveDraftModal);
export default withStyles(styles)(wrappedMoveDraftModal);
