import React from "react";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Dashboard from "./Dashboard";
import PrivacyPolicy from "./PrivacyPolicy";
import { Switch, Route, Router } from "react-router-dom";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        </Switch>
      </Router>
    );
  }
}

export default App;
