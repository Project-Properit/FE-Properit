import React, { Component } from 'react';
import { connect } from "react-redux";
import RenterInvitesTable from "./renterInvitesTable";
import { approveInvite, loadInvites } from "../../actions/renterDetailsActions";

class NewUserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {modalOpened: false, isSetOnce: false};
	}

	componentDidMount() {
		this.props.loadInvites(this.props.userId)
	}

	// openModal = () => {
	// 	this.props.clearRenterDetails()
	// 	this.setState({modalOpened: true})
	// };
	//
	// closeModal = () => {
	// 	this.setState({modalOpened: false})
	// };
	onApprove = (assetId) => {
		console.log(assetId)
		console.log(this.props.userId)
		this.props.approveInvite(this.props.userId,assetId)
	}

	render() {
		return (
			<div className="App">
				{/*{this.state.modalOpened ?*/}
				{/*  : null*/}
				{/*}*/}
				<header className="App-header">
				</header>
				<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>


					<h2>My Invites</h2>
					{this.props.my_invites.length > 0 ?
						<RenterInvitesTable
							invites={this.props.my_invites}
							onApprove={(assetId)=>this.onApprove(assetId)}
						/> :
						<div>
                            You have no invites
						</div>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({clientReducer, renterInvitesReducer}) => ({
	userId: clientReducer.userId,
	my_invites: renterInvitesReducer.my_invites
});

const mapDispatchToProps = dispatch => ({
	loadInvites: (userId) => dispatch(loadInvites(userId)),
	approveInvite: (userId, assetId) => dispatch(approveInvite(userId, assetId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewUserPage);