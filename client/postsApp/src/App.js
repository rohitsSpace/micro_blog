import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Landing from "./components/Landing";

export default ({ history }) => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
};
