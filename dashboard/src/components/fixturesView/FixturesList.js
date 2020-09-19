import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";

const styles = (theme) => ({
  section: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  header: {
    padding: theme.spacing(2),
    fontWeight: "bold",
  },
  info: {
    padding: theme.spacing(0.5),
  },
});

class FixturesList extends React.Component {
  render() {
    const { classes, gameweeks, selectedGameweek } = this.props;

    return (
      <>
        <div className={classes.section}>
          <Typography className={classes.header} variant="h5">
            {selectedGameweek in gameweeks
              ? gameweeks[selectedGameweek].name
              : ""}
          </Typography>
        </div>
        <Divider />
        <div className={classes.section}>
          <Typography className={classes.info} variant="body2">
            All times are shown in your local time
          </Typography>
        </div>
      </>
    );
  }
}

FixturesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameweeks: state.gameweeks,
    selectedGameweek: state.selected.gameweek,
  };
};

const wrappedFixturesList = connect(mapStateToProps)(FixturesList);
export default withStyles(styles)(wrappedFixturesList);
