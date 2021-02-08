import React, { useState } from 'react';
import { Alert } from "react-bootstrap";

function AlertMe(props) {    
    return (
        <div>
            <Alert variant={props.variant} >
                <Alert.Heading>There's been an error</Alert.Heading>
                {props.children}
            </Alert>
        </div>
    )
}

export default AlertMe
