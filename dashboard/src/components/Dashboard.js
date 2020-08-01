import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
// import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";
import history from "../history";
import { AUTH_TOKEN_FIELD } from "../constants";

const styles = () => ({
  root: {
    display: "flex",
  },
});

class Dashboard extends React.Component {
  componentDidMount() {
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (authToken) {
      this.props.fetchStaticData();
    } else {
      localStorage.removeItem(AUTH_TOKEN_FIELD);
      history.push("/signin");
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <SquadSelector />
        <SquadView />
        {/* <FixturesView /> */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedDashboard = connect(null, { fetchStaticData })(Dashboard);
export default withStyles(styles)(wrappedDashboard);
