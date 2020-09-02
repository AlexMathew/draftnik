import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = (theme) => ({});

class InfoModal extends React.Component {
  render() {
    const {
      classes,
      open,
      title,
      content,
      cta,
      handleContinue,
      handleClose,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{content}</DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                handleContinue();
                handleClose();
              }}
              color="primary"
            >
              {cta}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

InfoModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoModal);
