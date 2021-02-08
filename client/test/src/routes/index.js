import React from 'react';
import {Switch} from 'react-router-dom';
import {Register, Login, Dashboard, Logout} from "../pages";
import Route from "./Route"


function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/login" component={Login} />            
            <Route path="/dashboard" isPrivate component={Dashboard} />
            <Route path="/logout" isPrivate component={Logout} />
            <Route invalidRoute={true}  />
        </Switch>
    )
}

export default Routes;
