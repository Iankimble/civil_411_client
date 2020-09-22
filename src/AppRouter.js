import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/util/Navbar";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Learn from "./components/pages/Learn";
import Resources from "./components/pages/Resources";

import PageNotFound from "./components/pages/PageNotFound";

const AppRouter = () => (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/learn" component={Learn} />
      <Route exact path="/resource" component={Resources} />

      {/*404 for page route that doesn't exist*/}
      <Route path="*" exact={true} component={PageNotFound} />
    </Switch>
  </div>
);

export default AppRouter;
