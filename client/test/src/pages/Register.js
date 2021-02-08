import React, { useState, useEffect } from "react";
import { AuthFields, Menu } from "../components";
import { Card, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import { Auth, Util } from "../helpers";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

const REGISTER_USER = gql`
  mutation registerUser($registrationInput: RegistrationInput!){
  registerUser(registrationInput: $registrationInput){
    user{     
      authInfo{ 
        userName       
        token      
      }
    }
    message{
			success
      messages
		}
  }
}
`;

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});



function Register() {
  const [fileName, setFileName] = useState("Select images file only");
  const [isFileInvalid, setIsFileInvalid] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [redirect, setRedirect] = useState("");
  const [registerUser, { data }] = useMutation(REGISTER_USER);

  const onFormSubmission = async (event) => {
    event.preventDefault();
    if (isFileInvalid) {
      setErrors(["Invalid File"]);
      return false;
    }

    const data = new FormData(event.target);
    const registrationInput = {};
    const profilePicture = {
      base64: null,
      extension: null
    };
    var file = {};

    for (var [key, value] of data.entries()) {
      if (key === "profilePicture") {
        file = value;
        continue;
      }
      registrationInput[key] = value;
    }
    if (file) {
      profilePicture.extension = file.type.split("/")[1];
      let base64 = await toBase64(file).catch((error) => {

      });

      if (base64) {
        profilePicture.base64 = base64.split(",")[1];
      }


    }

    setShowLoading(true);

    const respData = await registerUser({
      variables: {
        registrationInput: {
          ...registrationInput,
          profilePicture: {
            ...profilePicture
          }
        }
      }
    }).catch((error) => {      
      setErrors(["There's been an error connecting to server. Please try again"]);
    });

    setShowLoading(false);    
    if (respData) {
      if (respData.data.registerUser) {
        let response = respData.data.registerUser;        
        if (response.message.success === false) {
          setErrors(response.message.messages);
        } else {          
          Auth.setLogin(response.user);
          setRedirect("/dashboard");
        }

      }
    }

  };
  const onFileInputChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  }
  

  useEffect(() => {
    var input = document.getElementById("profilePicture");
    if (input) {
      var file = input.files[0];
      if (file) {
        let mimetype = file.type;
        if (mimetype.split("/")[0] !== "image") {
          setIsFileInvalid(true);
        } else {
          setIsFileInvalid(false);
        }
      }
    }

  }, [fileName]);
  if (redirect !== "") return (<Redirect to={redirect} />);
  return (
    <div>
    <Menu /> 
    <Row>
      <Col md={12}>
        <Card>
          <Card.Header className="bold">Please Sign Up or Login </Card.Header>
          <Card.Body>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>

                <Form onSubmit={onFormSubmission}>
                  {errors.length > 0 &&
                    (Util.showErrors(errors))
                  }

                  <AuthFields required="required" />

                  <Form.Group controlId="confirmPassword">
                    <Form.Label className="required">Confirm Password</Form.Label>
                    <InputGroup >
                      <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon="key" /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" required />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label className="required">Email</Form.Label>
                    <InputGroup >
                      <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon="at" /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="email"
                        placeholder="Enter your Email"
                        required
                        name="email"
                      />
                    </InputGroup>

                  </Form.Group>

                  <Form.Group controlId="name">
                    <Form.Label className="required">Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter your Name"
                      required
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group controlId="profilePicture">
                    <Form.Label >Profile Picture</Form.Label>
                    <Form.File id="profilePicture" custom>

                      <Form.File.Input name="profilePicture" isInvalid={isFileInvalid} onChange={onFileInputChange} />

                      <Form.File.Label data-browse="Browse">
                        {fileName}
                      </Form.File.Label>
                      <Form.Control.Feedback type="invalid">File is not an image</Form.Control.Feedback>
                    </Form.File>
                  </Form.Group>



                  <Form.Text className="text-muted bold">
                    All fields (<span className="red">*</span>) are required
                    </Form.Text>
                  <Form.Text className="text-muted bold">
                    Password must contain at least 8 characters
                    </Form.Text>
                  <br />
                  <Button
                    className="floatRight"
                    variant="primary"
                    type="submit"
                    disabled={showLoading}
                  >
                    <FontAwesomeIcon className="icon" icon="sign-in-alt" />
                      Sign Up
                    </Button>
                  <br />
                  <Loader
                    className="text-center"
                    type="Puff"
                    color="#E82229"
                    height={100}
                    width={100}
                    visible={showLoading}
                  />
                  <br />

                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
  );
}

export default Register;
