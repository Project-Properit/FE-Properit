import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React from "react";
import {checkTotalAmount} from "./CreateGroupPayments"

export const UserPaymentCard  = props => {
    const user = props.user;
    const amounts = props.amounts;
    return (
        <Col style={{margin: '1rem'}}>
            <Card border={null} style={{width: "18rem"}}>
                    <Card.Body>
                    <Card.Title>
                        <p style={{float: 'left'}}><b>{user ? user.first_name : null}</b></p>
                        {/*<div style={{width:'4rem'}}></div>*/}
                        <div style={{clear: 'both'}}/>
                    </Card.Title>
                    <input  name="amount" type="number" placeholder={amounts[user.email]? amounts[user.email]: "Amount"}/>
                </Card.Body>
            </Card>
        </Col>)
    }
