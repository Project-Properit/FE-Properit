import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.scss"

export const PropertyCard = props => {
	const prop = props.property;
	const propImage = prop.img_url ? prop.img_url : 'https://properit.s3.amazonaws.com/house1.jpg'
	return (
		<div className="propBody">
			<div className="propCard">
				<img src={propImage} className="propCard-image"/>
				<div className="propCard-text">
					<span className="tenants">{prop.tenant_list.length || 0} tenants</span>
					<h2> {prop.address}</h2>
					<p>{prop.comments}</p>
					<Card.Link as={Link} to={props.groupsPaymentsUrl} className="value">Show all Payments</Card.Link>
					<Card.Link as={Link} to={props.infoUrl} className="value">Choose</Card.Link>
				</div>
				<div className="propCard-stats">
					<div className="stat">
						<Card.Link as={Link} to={props.editUrl} className="value">Info</Card.Link>
					</div>
				</div>
			</div>

		</div>
	)
};