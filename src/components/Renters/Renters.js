import React, { Component } from 'react';
import { connect } from "react-redux";
import RentersTable from "./RentersTable";
import { Button } from "@material-ui/core";
import InviteRenter from "./InviteRenter";
import { clearRenterDetails, getRenterDetails, inviteRenter } from "../../actions/renterDetailsActions";

class Renters extends Component {
	constructor(props) {
		super(props);
		this.state = {modalOpened: false, isSetOnce: false};
	}

	componentDidMount() {

	}

	openModal = () => {
		this.props.clearRenterDetails()
		this.setState({modalOpened: true})
	};

	closeModal = () => {
		this.setState({modalOpened: false})
	};

	render() {
		const {propId} = this.props.match.params;

		return (
			<div className="App">
				{this.state.modalOpened ?
					<InviteRenter
						assetId={propId}
						renterNotFound={this.props.renterNotFound}
						clearDetails={this.props.clearRenterDetails}
						inviteRenter={this.props.inviteRenter}
						renterDetails={this.props.renterDetails}
						getRenterDetails={this.props.getRenterDetails}
						closeHandler={this.closeModal}
					/> : null
				}
				<header className="App-header">
				</header>
				<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
					{this.props.myProperty.tenant_list.length > 0 ?
						<>
							<h2>My Renters</h2>
							<Button variant="outlined" color="primary"
							        className="createDocumentButton" onClick={this.openModal}>
								Invite A Renter
							</Button>
							<RentersTable
								renters={this.props.myProperty.tenant_list}
							/>
						</> : <>
							<h2>Please order renters to your Asset</h2>
							<Button variant="outlined" color="primary"
							        className="createDocumentButton" onClick={this.openModal}>
								Invite A Renter
							</Button>
						</>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({myPropertyReducer, renterReducer}) => ({
	myProperty: myPropertyReducer.myProperty,
	renterDetails: renterReducer.renterDetails,
	renterNotFound: renterReducer.notFound
});

const mapDispatchToProps = dispatch => ({
    getRenterDetails: (mail) => dispatch(getRenterDetails(mail)),
    inviteRenter: (assetId,renterId) => dispatch(inviteRenter(assetId,renterId)),
    clearRenterDetails: () => dispatch(clearRenterDetails()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Renters);