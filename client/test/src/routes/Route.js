import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Auth } from "../helpers"

export default function RouteExtended({ component, isPrivate, invalidRoute, ...rest }) {        
    var isUserSigned = Auth.checkIfUserIsLoggedIn();
    
    if (invalidRoute) {
        return <Redirect to="/" />;

    }

    if (isPrivate && !isUserSigned) {
        return <Redirect to="/" />;
    }

    if (!isPrivate && isUserSigned) {
        return <Redirect to="/dashboard" />;
    }

    return <Route invalidRoute component={component} />;
    
}



