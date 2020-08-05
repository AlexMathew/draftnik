import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getPlayers } from "../utils/players";
import draftnik from "../api/draftnik";

const styles = () => ({
  smallSize: {
    fontSize: "small",
  },
  mediumSize: {
    fontSize: "medium",
  },
});

class DraftDialog extends React.Component {
  saveDraft = () => {
    const squad = getPlayers();
    draftnik
      .post("/draft/", { squad })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  handleSaveClick = () => {
    this.props.handleClose();
    this.saveDraft();
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          classes={{
            root: classes.mediumSize,
          }}
        >
          Save Draft
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText variant="h6">
            You can add a name to the draft that you're saving. If you don't add
            a name, a placeholder name will be used.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Draft Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.handleClose}
            color="primary"
            variant="text"
            classes={{
              root: classes.smallSize,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSaveClick}
            color="primary"
            variant="text"
            classes={{
              root: classes.smallSize,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DraftDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DraftDialog);
