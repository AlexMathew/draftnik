import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchStaticData } from "../../actions";
import { AUTH_TOKEN_FIELD } from "../../constants";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
    },
    display: "grid",
    width: theme.spacing(300),
    height: theme.spacing(200),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
  },
});

class Dashboard extends React.Component {
  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.fetchStaticData();
      } else {
        this.props.history.push("/noauth");
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <SquadSelector />
        <SquadView />
        <FixturesView />

        <Backdrop className={classes.backdrop} open={this.props.staticLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    staticLoading: state.loading.static,
  };
};

const wrappedDashboard = connect(mapStateToProps, { fetchStaticData })(
  Dashboard
);
export default withStyles(styles)(wrappedDashboard);
