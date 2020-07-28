import React from "react";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchStaticData();
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
