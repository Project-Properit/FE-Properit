import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import loginRequest from '../actions/loginActions'
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logoWhite .jpg";


class Login extends Component {
    submit = (values) => {
        this.props.loginRequest(values)
    }

    render() {
        const {
            handleSubmit, // remember, Redux Form injects this into our props
            login: {
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props

        return (
            <div>
                 <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/login"><img className="logo" style={{height: '60px'}} src={logo}
                                                          alt='logo'/></Navbar.Brand>
                 </Navbar>
             <div style={{textAlign:'center',marginTop:'20px'}} className={'container'}>
            <div className="login">
                <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
                    <h1>LOGIN</h1>
                    <label htmlFor="email">Email</label>
                    {/*
            Our Redux Form Field components that bind email and password
            to our Redux state's form -> login piece of state.
          */}
                    <Field
                        name="email"
                        type="text"
                        id="email"
                        className="email"
                        component="input"
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        id="password"
                        className="password"
                        component="input"
                    />
                    <button action="submit">LOGIN</button>
                </form>
                <div className="auth-messages">
                    {/* As in the signup, we're just using the message and error helpers */}
                    {!requesting && !!errors.length && (
                        <Errors message="Failure to login due to:" errors={errors}/>
                    )}
                    {!requesting && !!messages.length && (
                        <Messages messages={messages}/>
                    )}
                    {requesting && <div>Logging in...</div>}
                    {!requesting && !successful && (
                        <Link to="/signup">Need to Signup? Click Here »</Link>
                    )}
                </div>
            </div>
             </div>
                     </div>
        )
    }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
    login: state.loginReducer,
})

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, {loginRequest})(Login)

// in our Redux's state, this form will be available in 'form.login'
const formed = reduxForm({
    form: 'login',
})(connected)

export default formed