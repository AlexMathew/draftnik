import React from "react";
import _ from "lodash";
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
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getPlayers } from "../../utils/players";
import draftnik from "../../api/draftnik";
// import { indicateRefresh } from "../../actions";
import { AUTH_TOKEN_FIELD, ACTIONS, GAMEWEEK_DATA } from "../../constants";

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
  draftFields: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    alignSelf: "flex-end",
    marginLeft: theme.spacing(1),
    minWidth: 240,
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
  "@global": {
    ".MuiInputLabel-root": {
      fontSize: "small",
    },
    ".MuiInput-root": {
      fontSize: "small",
    },
    ".MuiFormHelperText-root": {
      fontSize: "small",
    },
    ".MuiSelect-root": {
      fontSize: "small",
    },
    ".MuiMenuItem-root": {
      fontSize: "small",
    },
  },
});

class DraftDialog extends React.Component {
  state = {
    name: "",
    gameweek: "",
    loading: false,
  };

  saveDraft = () => {
    const name = this.state.name;
    const gameweek = this.state.gameweek || null;
    const squad = getPlayers();
    const fields = ["name"];

    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      if (AUTH_TOKEN_FIELD in result) {
        const { auth_token } = result[[AUTH_TOKEN_FIELD]];
        if (auth_token !== undefined && auth_token !== null) {
          this.setState({ loading: true });
          draftnik
            .post(
              "/draft/",
              { squad, name, gameweek },
              {
                headers: {
                  Authorization: `Token ${auth_token}`,
                },
              }
            )
            .then(() => {
              this.props.handleClose();
              this.setState({ name: "", gameweek: "" });
              // this.props.indicateRefresh();
            })
            .catch((err) => {
              if (err.response?.status === 401) {
                chrome.storage.local.remove([AUTH_TOKEN_FIELD]);
                chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
                this.props.handleClose();
              } else if (err.response?.status === 400) {
                const error = {};
                const data = err.response.data;
                fields.forEach((field) => {
                  error[[field]] = (data[[field]] || []).join(" ");
                });
                this.props.setDialogError(error);
              } else {
                this.props.setDialogError({
                  name: "Sorry! We seem to have encountered an issue. Please try again later.",
                });
              }
            })
            .finally(() => {
              this.setState({ loading: false });
            });
        } else {
          chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
        }
      } else {
        chrome.runtime.sendMessage({ action: ACTIONS.OPEN_OPTIONS });
      }
    });
  };

  getGameweeks() {
    const { gameweeks } = this.props;
    return _.isEmpty(gameweeks) ? GAMEWEEK_DATA : gameweeks;
  }

  render() {
    const { classes } = this.props;
    const { error } = this.props.modalState;
    const { loading } = this.state;
    const gameweeks = this.getGameweeks();

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
            src={chrome.runtime.getURL("icons/logo48.png")}
            className={classes.avatar}
          />
          Save Draft
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            classes={{
              root: classes.smallSize,
            }}
          >
            You can add a name to the draft that you're saving. If you don't add
            a name, a placeholder name will be used. You can also associate your
            draft with a particular gameweek.
          </DialogContentText>
          <div className={classes.draftFields}>
            <TextField
              autoFocus
              id="name"
              label="Draft Name"
              type="text"
              fullWidth
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
              inputProps={{
                maxLength: "256",
              }}
              error={error.name !== undefined && error.name !== ""}
              helperText={error.name}
            />
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.gameweek}
                onChange={(event) => {
                  this.setState({ gameweek: event.target.value });
                }}
                displayEmpty
              >
                <MenuItem value="">Upcoming Gameweek</MenuItem>
                <Divider />
                {Object.keys(gameweeks).map((gwIndex) => {
                  const gw = gameweeks[gwIndex];
                  return (
                    <MenuItem key={gw.id} value={gw.id}>
                      {gw.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.handleClose}
            color="primary"
            variant="text"
            classes={{
              root: classes.smallSize,
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <div className={classes.buttonWrapper}>
            <Button
              onClick={this.saveDraft}
              color="primary"
              variant="text"
              classes={{
                root: classes.smallSize,
              }}
              disabled={loading}
            >
              Save
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

DraftDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DraftDialog);
