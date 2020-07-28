import React from "react";
import Header from "./Header";
import SquadSelector from "./SquadSelector";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";

class Dashboard extends React.Component {
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

export default Dashboard;
