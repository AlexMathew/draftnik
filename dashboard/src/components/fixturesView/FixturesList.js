import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = () => ({});

class FixturesList extends React.Component {
  render() {
    const { classes, gameweeks, selectedGameweek } = this.props;

    return (
      <div>
        <Typography variant="h5">
          {selectedGameweek in gameweeks
            ? gameweeks[selectedGameweek].name
            : ""}
        </Typography>
      </div>
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
