import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";

export const PropertyCard = props => {
    const prop = props.property;
    return (
        <Col style={{margin: '1rem'}}>
            <Card border={null} style={{width: "18rem"}}>
                <Card.Img style={{height: '13rem'}} variant="top" src={prop.img_url} alt="No Image"/>
                <Card.Body>
                    <Card.Title>
                        <p style={{float:'left'}}><b>{prop.name}</b></p>
                        {/*<div style={{width:'4rem'}}></div>*/}
                        <p style={{float:'right'}}>{prop.tenants.length||0} tenants</p>
                        <div style={{clear:'both'}}/>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{prop.address}</Card.Subtitle>
                    <Card.Link href={'#'+props.infoUrl}>Info</Card.Link>
                    <Button style={{marginLeft:'1rem'}} onClick={()=>props.onRemove(prop.prop_id)} variant="outline-danger">Remove</Button>

                </Card.Body>
            </Card>
        </Col>)
};