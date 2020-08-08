import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.scss"
import home2 from '../images/home2.jpg'
import {Button, IconButton } from "@material-ui/core";
import {Add, Edit, OpenInBrowser} from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '../images/homeCard.png'

export const PropertyCard = props => {
	const prop = props.property;
	// const propImage = prop.img_url ? prop.img_url : 'https://properit.s3.amazonaws.com/house1.jpg'

	return (
		<div className="propBody">
			<div className="propCard">
				<div className="imgBox">
					<img src={HomeIcon}/>
				</div>
				<div className="contentBx">
					<h2> {prop.address}</h2>
					<div className="propCard-text">
						<span>{prop.tenant_list.length || 0} tenants</span>
						<p>{prop.comments}</p>
						<Tooltip title="Edit The Property" placement="right-start">
									{/*<Card.Link as={Link} to={props.editUrl} className="EditValue"><Edit/></Card.Link>*/}
							<a href={props.editUrl} className="EditValue"><Edit/></a>
						</Tooltip>
					</div>
					<a href={props.infoUrl} className="Choose">Choose</a>

				</div>
				{/*	<h2> {prop.address}</h2>*/}
				{/*	<img className="propImg" src="https://properit.s3.amazonaws.com/house1.jpg"/>*/}
				{/*</div>*/}
				{/*<div className="propCard-text">*/}
				{/*	<span>{prop.tenant_list.length || 0} tenants</span>*/}
				{/*	<h2> {prop.address}</h2>*/}
				{/*	<p>{prop.comments}</p>*/}
				{/*	<Tooltip title="Edit The Property" placement="right-start">*/}
				{/*		<Card.Link as={Link} to={props.editUrl} className="EditValue"><Edit/></Card.Link>*/}
				{/*	</Tooltip>*/}
				{/*	<Button variant="outlined" color="primary" onClick={()=>props.onChoose()}>*/}
				{/*		<Card.Link as={Link} to={props.infoUrl} className="ChooseValue"><OpenInBrowser/> Choose</Card.Link>*/}
				{/*	</Button>*/}
				{/*</div>*/}
			</div>
		</div>
	)
};