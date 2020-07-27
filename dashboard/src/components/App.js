import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import { Switch, Route, BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
