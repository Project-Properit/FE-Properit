import React, { Component } from 'react';
import { Button, TextField } from "@material-ui/core";
import FadeIn from "react-fade-in";
import MyModal from "../pages/Modal";
import { connect } from "react-redux";


class InviteRenter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mail: ''
		};
	}

	componentDidMount() {

	}

	mailChanged = (e) => {
		const {value} = e.target;
		this.setState({mail: value});
		if (this.props.renterDetails || this.props.renterNotFound|| this.props.renterExists || this.props.renterExistsInOtherProperty)
			this.props.clearDetails()
	}
	GetDetails = () => {
		console.log("Getting details on ", this.state.mail)
		this.props.getRenterDetails(this.state.mail)
	}
	inviteTenant = () => {
		console.log("inviteTenant details on ", this.props.renterDetails.id, this.props.assetId)
		this.props.inviteRenter(this.props.assetId, this.props.renterDetails.id)
		if (this.props.inviteSuccess)
		{
			this.props.closeHandler()
		}
	}
	    onKeyDown1 = (e) => {
        if (e.key === 'Enter') {
        	e.preventDefault();
            e.stopPropagation();
            if(this.props.renterDetails)
            {
            	this.inviteTenant()
            }
            else {
            	this.GetDetails()
            }
        }
    }


	render() {
		return (
			<div>
				<MyModal  open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
				         style={{width: "30%"}}>
					<div style={{textAlign: 'center',width: "100%"}}>
						<FadeIn className="register-fade group-payment" style={{width: "100%"}}>
							<div className="register-box" style={{background: "white", width: "100%"}}>
								<form>
									<TextField onKeyPress={e=>this.onKeyDown1(e)}
										className="item"
										value={this.state.mail}
										onChange={this.mailChanged}
										label="Mail"
										required
									/>
									{this.props.renterDetails ?
										<>
											<div>{this.props.renterDetails.first_name} {this.props.renterDetails.last_name}</div>
											<div>{this.props.renterDetails.phone}</div>
											<Button
												className="button"
												color="primary"
												variant="contained"
												style={{fontWeight: "bold", fontSize: "24px"}}
												onClick={this.inviteTenant}
											>Invite</Button>
										</>
										: <>
										{this.props.renterNotFound&&<div>Renter not found, try different mail</div>}
										{this.props.renterExists&&<div>Renter already exists in this asset</div>}
										{this.props.renterExistsInOtherProperty&&<div>Renter already a member of a property</div>}
										</>
									}
									{!this.props.renterDetails &&
									<Button
										className="button"
										color="primary"
										variant="contained"
										style={{fontWeight: "bold", fontSize: "24px"}}
										onClick={this.GetDetails}
									>Find</Button>}
								</form>
							</div>
						</FadeIn>
					</div>
				</MyModal>
			</div>
		)
	}
}


export default connect(
	null,
	null
)(InviteRenter);