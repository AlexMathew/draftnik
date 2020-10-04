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
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { renameDraft } from "../../../actions";

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

class RenameDraftModal extends React.Component {
  nameRef = React.createRef();

  renameDraft = () => {
    const { draft } = this.props.state;
    const el = this.nameRef.current;
    this.props.renameDraft(draft, el.value);
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
          Rename "{state.draft.name}"
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
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
              defaultValue={state.draft.name}
              inputRef={this.nameRef}
              inputProps={{
                maxlength: "100",
              }}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  this.renameDraft();
                  handleClose();
                }}
              >
                Rename
              </Button>
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

const wrappedRenameDraftModal = connect(null, { renameDraft })(
  RenameDraftModal
);
export default withStyles(styles)(wrappedRenameDraftModal);
