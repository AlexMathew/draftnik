import React from "react";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";
import history from "../history";
import { AUTH_TOKEN_FIELD } from "../constants";

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
    return (
      <React.Fragment>
        <Header />
        <SquadSelector />
        <SquadView />
        <FixturesView />
      </React.Fragment>
    );
  }
}

export default connect(null, { fetchStaticData })(Dashboard);
