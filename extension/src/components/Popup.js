import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Dashboard from "./popup/Dashboard";
import NoAuth from "./popup/NoAuth";

class Popup extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/noauth" component={NoAuth} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Popup;
