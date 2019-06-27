import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-"

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = () => {
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/profile" component={Profile} />
        </Switch>
    </BrowserRouter>
}