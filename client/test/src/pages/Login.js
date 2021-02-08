import React, { useState, useEffect } from "react";
import { Menu, AuthFields } from "../components";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useMutation } from "@apollo/client";
import { Auth, Util } from "../helpers";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";


const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput!){
  loginUser(loginInput: $loginInput){
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


function Login() {
  const [errors, setErrors] = useState([]);
  const [loginUser] = useMutation(LOGIN_USER);
  const [showLoading, setShowLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("defaultUser");
    if (user) {


      var input = document.getElementById("rememberMe");
      input.checked = true;

      input = document.getElementById("userName");
      input.value = user;

    }
          
  }, []);


  const onFormSubmission = async (event) => {
    event.preventDefault();
    setShowLoading(true);

    const data = new FormData(event.target);
    const loginInput = {};
    var rememberMe = false;


    for (var [key, value] of data.entries()) {
      if (key === "rememberMe") {
        rememberMe = true;
        continue;
      }
      loginInput[key] = value;
    }

    const respData = await loginUser({
      variables: {
        loginInput: {
          ...loginInput
        }
      }
    }).catch((error) => {
      setErrors(["There's been an error connecting to server. Please try again"]);
    });

    setShowLoading(false);
    if (respData) {
      if (respData.data.loginUser) {
        let response = respData.data.loginUser;
        if (response.message.success === false) {
          setErrors(response.message.messages);
        } else {
          if (rememberMe) {
            localStorage.setItem("defaultUser", loginInput.userName);
          } else {
            localStorage.removeItem("defaultUser");
          }          
          Auth.setLogin(response.user);
          setRedirect("/dashboard");
        }

      }
    }

  }

  if (redirect !== "") return (<Redirect to={redirect} />);
  
  return (
    <div>
      <Menu />
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="bold">Please Sign In or Sign Up</Card.Header>
            <Card.Body>
              <Row>
                <Col md={{ span: 6, offset: 3 }} >
                  <Form onSubmit={onFormSubmission}>
                    {errors.length > 0 &&
                      (Util.showErrors(errors))
                    }
                    <AuthFields  />
                    <Form.Group controlId="rememberMe">
                      <Form.Check  type="checkbox" label="Remember Me" name="rememberMe" />
                    </Form.Group>
                    <Button
                      className="floatRight"
                      variant="primary"
                      type="submit"
                    >
                      <FontAwesomeIcon className="icon" icon="sign-in-alt" />
                      Sign in
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

export default Login;
