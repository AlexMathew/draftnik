import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { moveDraft } from "../../../../actions";

const styles = (theme) => ({
  draftName: {
    display: "flex",
    alignItems: "center",
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
});

class MoveModalContent extends React.Component {
  state = {
    gameweek: "",
  };

  componentDidMount() {
    const { gameweek } = this.props.draft;
    this.setState({
      gameweek,
    });
  }

  render() {
    const { classes, draft, moveState, moveDraft } = this.props;
    const originalGw = draft.gameweek;

    return (
      <>
        <DialogContent>
          <div className={classes.draftName}>
            <DialogContentText>Move draft to gameweek:</DialogContentText>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.gameweek}
                onChange={(event) => {
                  this.setState({ gameweek: event.target.value });
                }}
                displayEmpty
              >
                <MenuItem value="">Current Gameweek</MenuItem>
                <Divider />
                {Object.keys(this.props.gameweeks).map((gwIndex) => {
                  const gw = this.props.gameweeks[gwIndex];
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
          <div className={classes.buttonWrapper}>
            <Button
              onClick={() => {
                moveDraft(draft, originalGw, this.state.gameweek);
              }}
              disabled={moveState.requesting}
            >
              Move
            </Button>
            {moveState.requesting && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </DialogActions>
      </>
    );
  }
}

MoveModalContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    moveState: state.loading.move,
    gameweeks: state.gameweeks,
  };
};

const wrappedMoveModalContent = connect(mapStateToProps, {
  moveDraft,
})(MoveModalContent);
export default withStyles(styles)(wrappedMoveModalContent);
