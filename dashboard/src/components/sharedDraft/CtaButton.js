import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  landingPageButton: {
    [theme.breakpoints.up("md")]: {
      fontSize: "large",
      fontWeight: "bold",
    },
  },
});

class CtaButton extends React.Component {
  render() {
    const { classes, content, handleClick } = this.props;

    return (
      <Button
        className={classes.landingPageButton}
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleClick}
      >
        {content}
      </Button>
    );
  }
}

CtaButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CtaButton);
