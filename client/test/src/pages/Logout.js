import React from 'react'
import {Auth} from "../helpers";
import {Redirect} from "react-router-dom";
function Logout() {
    Auth.logout();
    return (
        
            <Redirect to="/" />        
    )

}

export default Logout
