import React from "react";
import SignIn from "./options/SignIn";
import SignUp from "./options/SignUp";
import LoggedIn from "./options/LoggedIn";
import { Switch, Route, HashRouter } from "react-router-dom";

class Options extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoggedIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Options;
