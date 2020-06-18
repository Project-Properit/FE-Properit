import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import FadeIn from "react-fade-in";

import "./login.css";

import Messages from '../../../notifications/Messages'
import Errors from '../../../notifications/Errors'
import loginRequest from '../../../actions/loginActions'


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			user: "",
			password: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);

	}

	submit = () => {
		console.log(this.state.user)
		console.log(this.state.password)
		this.props.loginRequest(this.state.user, this.state.password)
	}

	handleChange(event) {
		this.setState({user: event.target.value});
	}

	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

	render() {

		const toggleShowPassword = () => {
			this.setState({showPassword: !this.state.showPassword})
		};

		const {
			login: {
				requesting,
				messages,
				errors
			}
		} = this.props
		console.log(this.props)
		return (
			<FadeIn>
				<div className="login-page">
					<form style={{}} className="login-panel">
						<TextField
							required
							className="item"
							label="email"
							variant="outlined"
							value={this.state.user}
							onChange={this.handleChange}
						/>
						<TextField
							id="outlined-end-adornment"
							className="item"
							variant="outlined"
							type={this.state.showPassword ? "text" : "password"}
							value={this.state.password}
							onChange={this.handlePasswordChange}
							label="סיסמא"
							required
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={toggleShowPassword}
											edge="end"
										>
											{<VisibilityOff/>}

										</IconButton>
									</InputAdornment>)
							}}
						/>
					</form>
					<div className="auth-messages">
						{!requesting && !!errors.length && (
							<Errors message="Failure to login due to:" errors={errors}/>
						)}
						{!requesting && !!messages.length && (
							<Messages messages={messages}/>
						)}
						{requesting && <div>Logging in...</div>}
					</div>
					<Button
						color="primary"
						variant="contained"
						onClick={() => this.submit()}
						style={{fontWeight: "bold", fontSize: "24px"}}
					>
						הכנס למערכת
					</Button>
					<div style={{marginTop: '20px'}}>
						<Typography className="item">
							Need to Signup?
							<Link to="/signup">Need to Signup? Click Here »</Link>
						</Typography>
					</div>

				</div>
			</FadeIn>
		)
	}
}

const mapStateToProps = state => ({
	login: state.loginReducer
})
const mapDispatchToProps = dispatch => ({
	loginRequest: (user, password) => dispatch(loginRequest(user, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)