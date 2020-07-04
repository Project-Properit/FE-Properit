import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, IconButton, InputAdornment, TextField, Typography } from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import FadeIn from "react-fade-in";
import avatar from '../../../images/avatar-black2.png';

import "./login.css";

import Messages from '../../../notifications/Messages'
import Errors from '../../../notifications/Errors'
import loginRequest from '../../../actions/loginActions'
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../images/logoWhite .jpg";


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
		this.props.loginRequest(this.state.user, this.state.password)
	}
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            this.submit();
        }
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
		return (
			<div onKeyPress={e=>this.onKeyDown(e)}>
				<Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
					<Navbar.Brand href="/signUp"><img className="logo" style={{height: '60px'}} src={logo}
													  alt='logo'/>
					</Navbar.Brand>
				</Navbar>
				<div style={{textAlign:'center'}}>
			 <FadeIn className="login-fade">
				 {/*<div className="login-page">*/}
				<div className="login-box">
					<img src={avatar} className="avatar"/>
					<h1>Login Here</h1>
					<form className="login-panel">
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
							className="button"
							color="primary"
							variant="contained"
							onClick={() => this.submit()}
							style={{fontWeight: "bold", fontSize: "24px"}}
						>
							הכנס למערכת
						</Button>
						{/*<div style={{marginTop: '20px'}}>*/}
							<Typography className="item">
								<Link className="link" to="/signup">Need to Signup? Click Here »</Link>
							</Typography>
						{/*</div>*/}
					</form>



				</div>
			 {/*</div>*/}
			</FadeIn>
				</div>
			</div>

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