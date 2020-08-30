import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import PublicHeader from "./PublicHeader";

const styles = () => ({
  root: {
    display: "flex",
  },
});

class SharedDraftPage extends React.Component {
  render() {
    const { classes, body } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PublicHeader />
        {body}
      </div>
    );
  }
}

SharedDraftPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SharedDraftPage);
