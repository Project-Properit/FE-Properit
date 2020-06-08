import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import React from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import "./PropertyCard.scss"

export const PropertyCard = props => {
    const prop = props.property;
    const propImage = prop.img_url? prop.img_url :'https://properit.s3.amazonaws.com/house1.jpg'
    return (
        // <Col style={{margin: '1rem'}}>
        <div className="propBody">

            <div className="propCard">
                <img src={propImage} className="propCard-image" />
                <div className="propCard-text">
                    <span className="tenants">{prop.tenant_list.length||0} tenants</span>
                    <h2> {prop.address}</h2>
                    <p>{prop.comments}</p>
                </div>
                <div className="propCard-stats">
                    <div className="stat">
                        <Card.Link as={Link} to={props.infoUrl} className="value">Info</Card.Link>
                    </div>
                <div className="stat">
                    <Card.Link as={Link} to={props.groupsPaymentsUrl} className="value">Show all Payments</Card.Link>
                </div>
                </div>
            </div>

        </div>
        // </Col>

    )
};



{/*// <Col style={{margin: '1rem'}}>*/}
{/*//     <Card border={null} style={{width: "18rem"}}>*/}
{/*//         <Card.Img style={{height: '13rem'}} variant="top" src={propImage} alt="No Image"/>*/}
{/*//         <Card.Body>*/}
{/*//             <Card.Title>*/}
{/*//                 <p style={{float:'left'}}><b>{prop.address}</b></p>*/}
{/*//                 /!*<div style={{width:'4rem'}}></div>*!/*/}
{/*//                 <p style={{float:'right'}}>{prop.tenant_list.length||0} tenants</p>*/}
{/*//                 <div style={{clear:'both'}}/>*/}
{/*//             </Card.Title>*/}
{/*//             <Card.Text>{prop.rent_fee}$</Card.Text>*/}
{/*//             <Card.Subtitle className="mb-2 text-muted">{prop.comments}</Card.Subtitle>*/}
{/*//             <Card.Link as={Link} to={props.infoUrl}>Info</Card.Link>*/}
{/*//             /!*<Button style={{marginLeft:'1rem'}} onClick={()=>props.onRemove(prop.prop_id)} variant="outline-danger">Remove</Button>*!/*/}
{/*//*/}
{/*//         </Card.Body>*/}
{/*//     </Card>*/}
{/*// </Col>*/}