import React from "react";
import {Payment} from "./Payment";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


export const PaymentsInfo = (props) => {
    let payments = props.location.state
    return (
        <Container className="App">
            <div>
                <Row>
                    {payments.map((payment, index) => (<Payment key={index} payment={payment}/>))}
                </Row>
            </div>
        </Container>
    )
}