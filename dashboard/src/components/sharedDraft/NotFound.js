import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
  title: {
    display: "grid",
    placeItems: "center",
  },
});

class NotFound extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h4" className={classes.title}>
          Draft not found!
        </Typography>
      </main>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
