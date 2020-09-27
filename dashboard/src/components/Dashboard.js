import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";
import history from "../history";
import { AUTH_TOKEN_FIELD } from "../constants";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
    },
    display: "grid",
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

  componentDidUpdate() {
    const ogImage = document.querySelector(`meta[property='og:image']`);
    if (ogImage) {
      ogImage.remove();
    }

    const ogUrl = document.querySelector(`meta[property='og:url']`);
    if (ogUrl) {
      ogUrl.remove();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Draftnik</title>
          <meta
            name="description"
            content="Save team drafts you create on Fantasy Premier League."
          />
          <meta property="og:title" content="Draftnik" />
          <meta
            property="og:description"
            content="Save team drafts you create on Fantasy Premier League."
          />
        </Helmet>

        <CssBaseline />
        <Header />
        <SquadSelector />
        <SquadView />
        <FixturesView />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedDashboard = connect(null, { fetchStaticData })(Dashboard);
export default withStyles(styles)(wrappedDashboard);
