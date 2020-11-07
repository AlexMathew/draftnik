import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
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
  buttonWrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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
        <DialogContent dividers>
          <DialogActions>
            <div className={classes.buttonWrapper}>
              <Button onClick={() => {}} disabled={moveState.requesting}>
                Move
              </Button>
              {moveState.requesting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </DialogActions>
        </DialogContent>
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
  // renameDraft,
  closeMoveModal,
})(MoveDraftModal);
export default withStyles(styles)(wrappedMoveDraftModal);
