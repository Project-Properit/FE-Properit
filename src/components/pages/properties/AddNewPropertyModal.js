import React, { Component } from 'react';
import { connect } from "react-redux";
// import "./styles.css"
import { Button, TextField } from "@material-ui/core";
import { addNewProperty } from "../../../actions/propertyActions";
import MyModal from "../Modal";


class AddNewPropertyModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			room_num: 0,
			rent_fee: 0,
			comments: ''
		};
	}

	reset = () => {
		this.setState({
			address: '',
			room: 0,
			rental: 0,
			comment: ''
		})
	}

	submit = () => {
		this.props.AddNewProperty(this.state)
	}


	addressChanged = (e) => {
		const {value} = e.target;
		this.setState({address: value});
	}
	roomChanged = (e) => {
		const {value} = e.target;
		this.setState({room_num: value});
	}
	rentalChanged = (e) => {
		const {value} = e.target;
		this.setState({rent_fee: value});
	}
	commentChanged = (e) => {
		const {value} = e.target;
		this.setState({comments: value});
	}

	render() {

		return (
			<div>
				<MyModal open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
				         style={{width: "30%"}}>
					<div style={{padding: "24px", textAlign: "center"}}>
						<TextField
							value={this.state.address}
							variant="outlined"
							label="כתובת"
							style={{width: "100%", marginBottom: "24px"}}
							required
							onChange={this.addressChanged}
						/>
						<br/>

						<br/>
						<TextField
							value={this.state.room_num}
							variant="outlined"
							onChange={this.roomChanged}
							type="number"
							label="מספר חדרים"
							required
							style={{width: "100%", marginBottom: "24px"}}
						/>
						<br/>

						<br/>
						<TextField
							value={this.state.rent_fee}
							variant="outlined"
							onChange={this.rentalChanged}
							type="number"
							label="סכום השכירות הכולל"
							required
							style={{width: "100%", marginBottom: "24px"}}
						/>
						<br/>

						<br/>
						<TextField
							value={this.state.comments}
							variant="outlined"
							label="הערה"
							style={{width: "100%", marginBottom: "24px"}}
							required
							onChange={this.commentChanged}
						/>
						<br/>

						<br/>
						<Button id="createButton" variant="outlined" onClick={() => this.submit()} color="primary"
						        style={{marginTop: "10px"}}>
							צור נכס
						</Button>
					</div>
				</MyModal>;
			</div>
		)
	}
}


const mapStateToProps = ({myPropertyReducer, myGroupsPayments}) => ({
	myProperty: myPropertyReducer.myProperty,
	create: myGroupsPayments.create

});

const mapDispatchToProps = dispatch => ({
	// loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
	AddNewProperty: (all) => dispatch(addNewProperty(all))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddNewPropertyModal);