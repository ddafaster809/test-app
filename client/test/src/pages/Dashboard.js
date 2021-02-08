import React, { useState } from "react";
import { Menu } from "../components";
import { Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useQuery } from "@apollo/client";
import Loader from "react-loader-spinner";
import { Util, Auth } from "../helpers";


const GET_USER_INFO = gql`
    query queryUser{
        queryUser{
            user{
                name
                email
                profilePicture{
                    base64        
                }
                authInfo{
                    userName      
                }
             }
            logout
        }
    }
`;

function Dashboard() {
    const { loading, error, data } = useQuery(GET_USER_INFO, {
        context: {
            headers: {
                "Authorization": `Bearer ${Auth.getJWTToken()}`
            }
        }
    });
    if (loading) return <Loader className="text-center" type="Puff" color="#E82229" height={100} width={100} />;
    if (error) return Util.showErrors([error]);
    const user = data.queryUser.user;

    return (
        <div>
            <Menu />
            <Row>
                <Col md={12}>
                    <Card>
                        <Row>
                            <Col className="text-center" md={{ span: 6, offset: 3 }} >
                                <br/>
                                <br/>
                                <Card.Img className="profileImage" variant="top" src={`data:image/jpg;base64, ${user.profilePicture.base64}`} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 6, offset: 3 }} >
                                <Card.Body>
                                    <Card.Title className="center"><h2>Welcome {user.name}</h2></Card.Title>
                                    <br />                                    
                                    <Card.Text className="bold">
                                        This is your info:
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><span className="bold"> Name:</span> {user.name}</ListGroupItem>
                                    <ListGroupItem><span className="bold"> <FontAwesomeIcon icon="user" /> User Name:</span> {user.authInfo.userName}</ListGroupItem>
                                    <ListGroupItem><span className="bold"> <FontAwesomeIcon icon="at" />   Email:</span> {user.email}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Text >
                                        If You want to log out just press: <span className='bold'>Logout</span> in the menu header
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
