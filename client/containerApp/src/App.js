import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

const PostApp = lazy(() => import("./components/PostApp"));

const history = createBrowserHistory();

export default () => {
  return (
    <Router history={history}>
      <div className="container">
        <Suspense fallback={<>loading...</>}>
          <Switch>
            <Route path="/" component={PostApp} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};
