import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import clsx from "clsx";
import { selectDraft, selectGameweek } from "../../../actions";

const styles = () => ({
  paginator: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    alignSelf: "center",
  },
  paginatorButton: {
    color: "black",
  },
  paginatorButtonDisabled: {
    color: "lightgray",
  },
  gameweek: {
    alignSelf: "center",
    textAlign: "center",
  },
});

class GameweekPaginator extends React.Component {
  gameweekKeys = () => {
    return Object.keys(this.props.gameweeks);
  };

  updateGameweek = ({ up = false, down = false }) => {
    const selectedGameweek = parseInt(this.props.selectedGameweek);
    const change = up ? +1 : down ? -1 : 0;
    this.props.selectGameweek(selectedGameweek + change);
    this.props.selectDraft(null);
  };

  isFirstGameweek = () => {
    return this.props.selectedGameweek === this.gameweekKeys()[0];
  };

  isLastGameweek = () => {
    return this.props.selectedGameweek === this.gameweekKeys().slice(-1)[0];
  };

  render() {
    const { classes, gameweeks, selectedGameweek } = this.props;

    return (
      <div className={classes.paginator}>
        <Grid container spacing={3}>
          <Grid>
            <IconButton
              className={classes.paginatorButton}
              disabled={this.isFirstGameweek()}
              classes={{
                root: clsx({
                  [classes.paginatorButtonDisabled]: this.isFirstGameweek(),
                }),
              }}
              onClick={() => {
                this.updateGameweek({ down: true });
              }}
            >
              <ArrowLeftIcon style={{ fontSize: 60 }} />
            </IconButton>
          </Grid>
          <Grid item xs={6} className={classes.gameweek}>
            <Typography variant="h6">
              {selectedGameweek in gameweeks
                ? gameweeks[selectedGameweek].name
                : ""}
            </Typography>
          </Grid>
          <Grid>
            <IconButton
              className={classes.paginatorButton}
              disabled={this.isLastGameweek()}
              classes={{
                root: clsx({
                  [classes.paginatorButtonDisabled]: this.isLastGameweek(),
                }),
              }}
              onClick={() => {
                this.updateGameweek({ up: true });
              }}
            >
              <ArrowRightIcon style={{ fontSize: 60 }} />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    );
  }
}

GameweekPaginator.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameweeks: state.gameweeks,
    selectedGameweek: state.selected.gameweek,
  };
};

const wrappedGameweekPaginator = connect(mapStateToProps, {
  selectDraft,
  selectGameweek,
})(GameweekPaginator);
export default withStyles(styles)(wrappedGameweekPaginator);
