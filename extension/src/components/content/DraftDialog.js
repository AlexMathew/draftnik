import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getPlayers } from "../../utils/players";
import draftnik from "../../api/draftnik";
import { AUTH_TOKEN_FIELD, ACTIONS } from "../../constants";

const styles = (theme) => ({
  title: {
    display: "flex",
    alignItems: "center",
  },
  smallSize: {
    fontSize: "small",
  },
  mediumSize: {
    fontSize: "medium",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
});

class DraftDialog extends React.Component {
  state = {
    name: "",
  };

  saveDraft = () => {
    const name = this.state.name;
    const squad = getPlayers();
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      if (AUTH_TOKEN_FIELD in result) {
        const { auth_token } = result[[AUTH_TOKEN_FIELD]];
        if (auth_token !== undefined && auth_token !== null) {
          draftnik
            .post(
              "/draft/",
              { squad, name },
              {
                headers: {
                  Authorization: `Token ${auth_token}`,
                },
              }
            )
            .then(() => {})
            .catch((err) => {
              if (err.response.status === 401) {
                chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
                chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
              }
            });
        }
      } else {
        chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
      }
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
          className={classes.title}
          classes={{
            root: classes.mediumSize,
          }}
        >
          <Avatar
            src={chrome.extension.getURL("icons/logo48.png")}
            className={classes.avatar}
          />
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
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
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
