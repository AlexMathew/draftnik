import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { renameDraft, closeRenameModal } from "../../../actions";

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

class RenameDraftModal extends React.Component {
  nameRef = React.createRef();

  renameDraft = () => {
    const { draft } = this.props.renameState;
    const el = this.nameRef.current;
    this.props.renameDraft(draft, el.value);
  };

  render() {
    const { classes, renameState, closeRenameModal } = this.props;
    const draft = renameState.draft;

    return (
      <Dialog
        open={renameState.modalOpen}
        onClose={closeRenameModal}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Rename "{draft.name}"
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeRenameModal}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.draftName}>
            <TextField
              autoFocus
              margin="dense"
              id="draftName"
              name="draftName"
              type="text"
              required
              fullWidth
              defaultValue={draft.name}
              inputRef={this.nameRef}
              inputProps={{
                maxLength: "256",
              }}
              error={
                renameState.error?.name !== undefined &&
                renameState.error?.name !== ""
              }
              helperText={renameState.error?.name}
            />
            <DialogActions>
              <div className={classes.buttonWrapper}>
                <Button
                  onClick={() => {
                    this.renameDraft();
                  }}
                  disabled={renameState.requesting}
                >
                  Rename
                </Button>
                {renameState.requesting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

RenameDraftModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    renameState: state.loading.rename,
  };
};

const wrappedRenameDraftModal = connect(mapStateToProps, {
  renameDraft,
  closeRenameModal,
})(RenameDraftModal);
export default withStyles(styles)(wrappedRenameDraftModal);
