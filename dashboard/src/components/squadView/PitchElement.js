import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = () => ({});

class PitchElement extends React.Component {
  render() {
    const { classes, element } = this.props;

    return <Typography>{element.web_name}</Typography>;
  }
}

PitchElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PitchElement);
