import Card from "react-bootstrap/Card";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.scss"
import { Button } from "@material-ui/core";
import { Delete, OpenInBrowser } from "@material-ui/icons";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import Tooltip from "@material-ui/core/Tooltip";

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
					<h2> {prop.address}</h2>
					<img className="propImg" src="https://properit.s3.amazonaws.com/house1.jpg"/>
				</div>

				<div className="propCard-text">
					<Tooltip title="Remove The Property" placement="right-start">
						<Button className="EditValue" onClick={openModal}> <Delete/></Button>
					</Tooltip>
					<span>{prop.tenant_list.length || 0} tenants</span>
					<h2> {prop.address}</h2>
					<p>{prop.comments}</p>

					<Button variant="outlined" color="primary" onClick={() => props.onChoose()}>
						<Card.Link as={Link} to={props.infoUrl}
						           className="ChooseValue"><OpenInBrowser/> Choose</Card.Link>
					</Button>
				</div>
			</div>

		</div>
	)
};