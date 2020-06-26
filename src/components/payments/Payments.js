import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadPayments } from "../../actions/MyPaymentsActions";
import CollapsibleTable from "../GroupPaymentsTable";

class Payments extends Component {
	componentDidMount() {
		const {propId} = this.props.match.params
		this.props.loadPayments(propId, this.props.userId)
	}

	render() {
		console.log('this.props.myPayments',this.props.myPayments)
		return (
			<div>
			<CollapsibleTable groupPayments={this.props.myPayments}/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	loadPayments: (assetId, userId) => dispatch(loadPayments(assetId, userId))

});
const mapStateToProps = ({clientReducer, myPaymentsReducer}) => ({
	userId: clientReducer.userId,
	myPayments: myPaymentsReducer.myPayments

});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Payments));