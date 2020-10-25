import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = (theme) => ({
  draft: {
    height: "80vh",
    paddingTop: theme.spacing(3),
  },
});

class PlayerList extends React.Component {
  render() {
    const { classes, draft } = this.props;

    return <div className={classes.draft}>Squad.</div>;
  }
}

PlayerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const wrappedPlayerList = connect(mapStateToProps)(PlayerList);
export default withStyles(styles)(wrappedPlayerList);
