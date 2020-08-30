import React from "react";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Dashboard from "./Dashboard";
import SharedDraft from "./SharedDraft";
import SharedDraftNotFound from "./SharedDraftNotFound";
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
          <Route
            exact
            path="/draft/not-found"
            component={SharedDraftNotFound}
          />
          <Route path="/draft/:draftCode" component={SharedDraft} />
        </Switch>
      </Router>
    );
  }
}

export default App;
