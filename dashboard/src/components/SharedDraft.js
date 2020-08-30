import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import PublicHeader from "./sharedDraft/PublicHeader";
import SquadView from "./SquadView";
// import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";

const styles = () => ({
  root: {
    display: "flex",
  },
});

class SharedDraft extends React.Component {
  componentDidMount() {
    this.props.fetchStaticData();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <PublicHeader />
        <SquadView />
        {/* <FixturesView /> */}
      </div>
    );
  }
}

SharedDraft.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedSharedDraft = connect(null, { fetchStaticData })(SharedDraft);
export default withStyles(styles)(wrappedSharedDraft);
