import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {} from "../actions";

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
    padding: theme.spacing(3),
  },
});

class SquadView extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        Squad view.
      </main>
    );
  }
}

SquadView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const wrappedSquadView = connect(mapStateToProps, {})(SquadView);
export default withStyles(styles)(wrappedSquadView);
