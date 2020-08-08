import Card from "react-bootstrap/Card";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.scss"
import { Button } from "@material-ui/core";
import { Delete, OpenInBrowser } from "@material-ui/icons";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import Tooltip from "@material-ui/core/Tooltip";
import home2 from '../images/home2.jpg'
import {Button, IconButton } from "@material-ui/core";
import {Add, Edit, OpenInBrowser} from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '../images/homeCard.png'

export const PropertyCard = props => {
	const prop = props.property;
	const [payModalOpened, setPayModalOpened] = useState(false);
	const openModal = useCallback(() => {
		setPayModalOpened(true);
	}, []);

	const closeModal = useCallback(() => {
		setPayModalOpened(false);
	}, []);

	const handleRemove = () => {
		props.onRemove();
		closeModal()
	}
	const propImage = prop.img_url ? prop.img_url : 'https://properit.s3.amazonaws.com/house1.jpg'

	return (
		<div className="propBody">
			{payModalOpened ?
				<SimpleValidationModal open onApprove={handleRemove} closeMe={closeModal}/>
				: null}
			<div className="propCard">
				<div className="imgBox">
					<img src={HomeIcon}/>
				</div>
				<div className="contentBx">
					<h2> {prop.address}</h2>
					<div className="propCard-text">
						<span>{prop.tenant_list.length || 0} tenants</span>
						<p>{prop.comments}</p>
						<Tooltip title="Remove The Property" placement="right-start">
							<Button className="EditValue" onClick={openModal}> <Delete/></Button>
							{/*<a href={props.editUrl} className="EditValue"><Edit/></a>*/}

						</Tooltip>
					</div>
					<a href={props.infoUrl} className="Choose">Choose</a>
				</div>
			</div>

		</div>
	)
};