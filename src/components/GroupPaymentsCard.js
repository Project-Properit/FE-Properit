import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";

export const GroupPaymentsCard = props => {
    const prop = props.groupPayments;
    return (
        <Col style={{margin: '1rem'}}>
            <Card border={null} style={{width: "18rem"}}>
                <Card.Body>
                    <Card.Title>
                        <p style={{float:'left'}}><b>{prop.title}</b></p>
                        {/*<div style={{width:'4rem'}}></div>*/}
                        <div style={{clear:'both'}}/>
                    </Card.Title>
                    <Card.Text>{prop.amount}$</Card.Text>
                    <Card.Text>{prop.description}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{prop.creation_date}</Card.Subtitle>
                    <Row>
                        {prop.payments.map(payment => (
                            <a key={payment}>Payment</a>
                            ))}
                    </Row>
                    {/*<Button style={{marginLeft:'1rem'}} onClick={()=>props.onRemove(prop.prop_id)} variant="outline-danger">Remove</Button>*/}
                </Card.Body>
            </Card>
        </Col>)
};