import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";

export const PropertyCard = props => {
    const prop = props.property;
    return (
        <Col style={{margin: '1rem'}}>
            <Card style={{width: "18rem"}}>
                <Card.Body>
                    <Card.Title>{prop.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{prop.address}</Card.Subtitle>
                    <Card.Text>
                        Some quick example
                    </Card.Text>
                    <Card.Link href={'#'+props.infoUrl}>Info</Card.Link>
                    <Button style={{marginLeft:'1rem'}} onClick={()=>props.onRemove(prop.prop_id)} variant="outline-danger">Remove</Button>

                </Card.Body>
            </Card>
        </Col>)
};