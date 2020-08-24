import React, {useCallback, useState} from "react";
import "./PropertyCard.scss"
import {Delete, OpenInBrowser} from "@material-ui/icons";
import SimpleValidationModal from "./pages/Modal/SimpleValidationModal";
import Tooltip from "@material-ui/core/Tooltip";
import {Button} from "@material-ui/core";
import HomeIcon from '../images/homeCard.png';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
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
				<Tooltip title="Remove The Property" placement="right-start">
					<Button className="DeleteValue" onClick={openModal}
							style={{left:"-75px", boxShadow: "none"}}>
						<Delete style={{color: "#393939"}}/>
					</Button>
					{/*<a href={props.editUrl} className="EditValue"><Delete/></a>*/}

				</Tooltip>
				<div className="contentBx">
					<h2> {prop.address}</h2>
					<div className="propCard-text">
						<span>{prop.tenant_list.length || 0} tenants</span>
						<p>{prop.comments}</p>

					</div>
					{/*<a href={props.infoUrl} className="Choose">Choose</a>*/}
					<Button   onClick={() => props.onChoose()}>

					<Card.Link as={Link} to={props.infoUrl} className="Choose" style={{boxShadow: "none"}}>Choose</Card.Link>
					</Button>
			</div>
			</div>

		</div>
	)
};