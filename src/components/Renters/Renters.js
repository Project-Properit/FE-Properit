import React, { Component } from 'react';
import { connect } from "react-redux";
import RentersTable from "./RentersTable";
import { Button } from "@material-ui/core";
import InviteRenter from "./InviteRenter";
import { clearRenterDetails, getRenterDetails, inviteRenter } from "../../actions/renterDetailsActions";
import { loadProperty } from "../../actions/propertyActions";

class Renters extends Component {
	constructor(props) {
		super(props);
		this.state = {modalOpened: false, isSetOnce: false};
	}

	componentDidMount() {
		const {propId} = this.props.match.params;
		this.props.loadProperty(propId)
	}

	openModal = () => {
		this.props.clearRenterDetails()
		this.setState({modalOpened: true})
	};

	closeModal = () => {
		this.setState({modalOpened: false})
	};
	getRenterDetails = (mail) => {
		this.props.getRenterDetails(mail)
	};
	inviteRenter = (assetId, renterId) => {
		this.props.inviteRenter(assetId, renterId)
		const {propId} = this.props.match.params;
		// this.props.loadProperty(propId);
	};

	render() {
		const {propId} = this.props.match.params;
		console.log('this.props.myProperty.tenant_list', this.props.myProperty.tenant_list)

        return (
            <div className="App">
                {this.state.modalOpened ?
                    <InviteRenter
                        assetId={propId}
                        renterNotFound={this.props.renterNotFound}
                        renterExists={this.props.renterExists}
                        clearDetails={this.props.clearRenterDetails}
                        inviteRenter={this.inviteRenter}
                        renterDetails={this.props.renterDetails}
                        getRenterDetails={this.getRenterDetails}
                        closeHandler={this.closeModal}
                    /> : null
                }
                <header className="App-header">
                </header>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {this.props.myProperty.tenant_list.length > 0 || this.props.myProperty.pending_tenants.length > 0?
                        <>
                            <h2>Renters</h2>
                            {this.props.isOwner ?
                            <Button variant="outlined" color="primary"
                                    className="createDocumentButton" onClick={this.openModal}>
                                Invite A Renter
                            </Button>:null}
                            < RentersTable
                                renters={this.props.myProperty.tenant_list}
                                pendingRenters={this.props.myProperty.pending_tenants}
                            />
                        </> : this.props.isOwner ? <>
                            <h2>Please order renters to your Asset</h2>
                            <Button variant="outlined" color="primary"
                                    className="createDocumentButton" onClick={this.openModal}>
                                Invite A Renter
                            </Button>
                        </> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({myPropertyReducer, clientReducer, renterReducer}) => ({
	myProperty: myPropertyReducer.myProperty,
	renterDetails: renterReducer.renterDetails,
	renterNotFound: renterReducer.notFound,
	renterExists: renterReducer.renterExists,
	isOwner: clientReducer.isOwner,
	chosenMode: clientReducer.chosenMode
});

const mapDispatchToProps = dispatch => ({
	loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
	getRenterDetails: (mail) => dispatch(getRenterDetails(mail)),
	inviteRenter: (assetId, renterId) => dispatch(inviteRenter(assetId, renterId)),
	clearRenterDetails: () => dispatch(clearRenterDetails())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Renters);