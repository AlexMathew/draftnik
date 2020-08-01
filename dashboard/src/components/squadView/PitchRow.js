import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  PitchRow: {
    height: "20vh",
  },
});

class PitchRow extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <div className={classes.PitchRow}>
          {this.props.elements.map((element) => (
            <Typography>{element.web_name}</Typography>
          ))}
        </div>
      </Container>
    );
  }
}

PitchRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PitchRow);
