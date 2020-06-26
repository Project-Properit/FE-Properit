import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Messages from '../../../../notifications/Messages'
import Errors from '../../../../notifications/Errors'
import signupRequest from '../../../../actions/sugnUpActions'
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../../images/logoWhite .jpg";
import FadeIn from "react-fade-in";
import { Button, IconButton, InputAdornment, TextField } from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import "./register.css";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import avatar from "../../../../images/avatar-black2.png";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from '@material-ui/core/Select';


class Signup extends Component {
	submit = () => {
		let registerObject = this.state
		delete registerObject.focus
		this.props.signupRequest(registerObject);

	}

	state = {
		payment_details: {
			card_owner: '',
			card_number: '',
			valid_date: '',
			cvc: ''
		},
		focus: '',
		first_name: '',
		last_name: '',
		phone: '',
		password: '',
		email: '',
		user_type: ''
	};

	handleInputFocus = (e) => {
		this.setState({focus: e.target.name});
	}

	cardNumberHandleInputChange = (e) => {

		const {name, value} = e.target;
		let payment_details = this.state.payment_details
		payment_details.card_number = value
		this.setState({payment_details});
	}
	cardOwnerHandleInputChange = (e) => {
		const {name, value} = e.target;
		let payment_details = this.state.payment_details
		payment_details.card_owner = value
		this.setState({payment_details});
	}
	cardDateHandleInputChange = (e) => {
		const {name, value} = e.target;
		let payment_details = this.state.payment_details
		payment_details.valid_date = value
		this.setState({payment_details});
	}
	cardCvcHandleInputChange = (e) => {
		const {name, value} = e.target;
		let payment_details = this.state.payment_details
		payment_details.cvc = value
		this.setState({payment_details});
	}
	userTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({user_type: value});
	}
	emailTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({email: value});
	}
	firstTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({first_name: value});
	}
	lastTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({last_name: value});
	}
	phoneTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({phone: value});
	}
	passwordTypeChanged = (e) => {
		const {value} = e.target;
		this.setState({password: value});
	}

	render() {
		// grab what we need from props.  The handleSubmit from ReduxForm
		// and the pieces of state from the global state.
		const {
			signup: {
				requesting,
				successful,
				messages,
				errors
			}
		} = this.props

		return (
			<div>
				<Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
					<Navbar.Brand href="/signUp"><img className="logo" style={{height: '60px'}} src={logo}
					                                  alt='logo'/></Navbar.Brand>
				</Navbar>
				<div style={{textAlign: 'center'}}>
					<FadeIn className="register-fade">
						<div className="register-box">
							<img src={avatar} className="avatar"/>
							<h1>Register Here</h1>
							<form className="register-panel">
								{/*<div className="register-page">*/}
								{/*    <form className="register-panel">*/}
								<TextField
									className="item"
									value={this.state.email}
									onChange={this.emailTypeChanged}
									variant="outlined"
									label="Email"
									required
								/>
								<TextField
									className="item"
									value={this.state.first_name}
									onChange={this.firstTypeChanged}
									variant="outlined"
									label="First Name"
									required
								/>
								<TextField
									className="item"
									value={this.state.last_name}
									onChange={this.lastTypeChanged}
									variant="outlined"
									label="Last Name"
									required
								/>
								<TextField
									className="item"
									value={this.state.phone}
									onChange={this.phoneTypeChanged}
									variant="outlined"
									label="Phone"
									required
								/>
								<FormControl>
									<InputLabel id="demo-simple-select-label">User Type</InputLabel>
									<Select className="item"
									        labelId="user-type-select-label"
									        id="user-type-select"
									        value={this.state.user_type}
									        onChange={this.userTypeChanged}
									>
										<MenuItem value={"owner"}>Owner</MenuItem>
										<MenuItem value={"tenant"}>Tenant</MenuItem>
									</Select>
								</FormControl>

								<TextField
									id="outlined-end-adornment"
									className="item"
									variant="outlined"
									type={"password"}
									value={this.state.password}
									onChange={this.passwordTypeChanged}
									label="סיסמא"
									required
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													edge="end"
												>
													{<VisibilityOff/>}

												</IconButton>
											</InputAdornment>)
									}}
								/>
								<ExpansionPanel className="item">
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon/>}
										aria-controls="panel1a-content"
										className="item1"

									>
										<Typography className="heading">Add payment details</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<Typography>
											<div id="PaymentForm">
												<Cards
													cvc={this.state.payment_details.cvc}
													expiry={this.state.payment_details.valid_date}
													focused={this.state.focus}
													name={this.state.payment_details.card_owner}
													number={this.state.payment_details.card_number}
												/>
												<form>
													<input
														type="tel"
														name="payment_details.card_number"
														placeholder="Card Number"
														value={this.state.payment_details.card_number}
														onChange={this.cardNumberHandleInputChange}
														onFocus={this.handleInputFocus}
													/>
													<input
														type="tel"
														name="name"
														placeholder="Name"
														value={this.state.payment_details.card_owner}
														onChange={this.cardOwnerHandleInputChange}
														onFocus={this.handleInputFocus}
													/>
													<input
														type="tel"
														name="expiry"
														placeholder="Valid thru"
														value={this.state.payment_details.valid_date}
														onChange={this.cardDateHandleInputChange}
														onFocus={this.handleInputFocus}
													/>
													<input
														type="tel"
														name="cvc"
														placeholder="CVC"
														value={this.state.payment_details.cvc}
														onChange={this.cardCvcHandleInputChange}
														onFocus={this.handleInputFocus}
													/>

												</form>
											</div>
										</Typography>
									</ExpansionPanelDetails>
								</ExpansionPanel>

								<Button
									className="button"
									color="primary"
									variant="contained"
									style={{fontWeight: "bold", fontSize: "24px"}}
									onClick={() => this.submit()}
								>
									צור משתמש
								</Button>
								{!requesting && !successful && (
									<Typography className="item">
										<Link className="link" to="/login">Already a Member? Login Here »</Link>
									</Typography>

								)}
							</form>


						</div>
					</FadeIn>

					<div className="auth-messages">
						{
							/*
							These are all nothing more than helpers that will show up
							based on the UI states, not worth covering in depth.  Simply put
							if there are messages or errors, we show them
							*/
						}
						{!requesting && !!errors.length && (
							<Errors message="Failure to signup due to:" errors={errors}/>
						)}
						{!requesting && !!messages.length && (messages.length > 0) && (
							<Messages messages={messages}/>
						)}
						{!requesting && successful && (
							<div>
								Signup Successful! <Link to="/login">Click here to Login »</Link>
							</div>
						)}

					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	signup: state.signupReducer
})
const mapDispatchToProps = dispatch => ({
	signupRequest: (all) => dispatch(signupRequest(all))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)