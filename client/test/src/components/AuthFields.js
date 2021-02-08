import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AuthFields(props) {    
    return (
        <div >


            <Form.Group controlId="userName">
                <Form.Label className={(props.required) ? props.required : ""} >User Name</Form.Label>
                <InputGroup >
                    <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon="user" /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control name="userName" type="text" placeholder="Enter User Name" required />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label className={(props.required) ? props.required : ""}>Password</Form.Label>
                <InputGroup >
                    <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon="key" /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </InputGroup>                
            </Form.Group>
        </div>
    )
}

export default AuthFields;
