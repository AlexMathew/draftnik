import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PitchElement from "./PitchElement";

const styles = () => ({
  pitchRow: {
    height: "20vh",
  },
  pitchRowGk: {
    height: "15vh",
  },
});

class PitchRow extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={
          this.props.goalkeepers ? classes.pitchRowGk : classes.pitchRow
        }
      >
        {this.props.elements.map((element) => (
          <PitchElement key={element.id} element={element} />
        ))}
      </Grid>
    );
  }
}

PitchRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PitchRow);
