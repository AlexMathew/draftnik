import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import CopyIcon from "../utils/CopyIcon";

const styles = (theme) => ({
  draftUrl: {
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

class ShareDraftModal extends React.Component {
  urlRef = React.createRef();

  copyUrlToClipboard = () => {
    const el = this.urlRef.current;
    el.select();
    document.execCommand("copy");
  };

  render() {
    const { classes, state, handleClose } = this.props;

    return (
      <Dialog
        open={state.open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Share "{state.draft.name}"
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Use this link to share this draft.
          </DialogContentText>
          <div className={classes.draftUrl}>
            <TextField
              autoFocus
              margin="dense"
              id="draftUrl"
              type="text"
              fullWidth
              defaultValue={state.draft.url}
              inputRef={this.urlRef}
            />
            <DialogActions>
              <IconButton
                onClick={() => {
                  this.copyUrlToClipboard();
                }}
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

ShareDraftModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShareDraftModal);
