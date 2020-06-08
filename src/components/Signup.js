import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

import signupRequest from '../actions/sugnUpActions'
import Select  from "react-select";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logoWhite .jpg";
const userOptions = [
    {
      label: 'Asset Owner',
      value: 'owner',
    },
    {
      label: 'Asset tenant',
      value: 'tenant',
    }
  ];
export const ReduxFormSelect = props => {
  const { input, options } = props;
  return (
    <Select
      {...input}
      onChange={value => input.onChange(value)}
      onBlur={() => input.onBlur(input.value)}
      options={options}
    />
  )
}
class Signup extends Component {


    // Redux Form will call this function with the values of our
    // Form fields "email" and "password" when the form is submitted
    // this will in turn call the action
    submit = (values) => {
        // we could just do signupRequest here with the static proptypes
        // but ESLint doesn't like that very much...
        this.props.signupRequest(values)
    }

    render() {
        // grab what we need from props.  The handleSubmit from ReduxForm
        // and the pieces of state from the global state.
        const {
            handleSubmit,
            signup: {
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props

        return (
             <div>
                 <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/signUp"><img className="logo" style={{height: '60px'}} src={logo}
                                                          alt='logo'/></Navbar.Brand>
                 </Navbar>
            <div style={{textAlign:'center',marginTop:'20px'}} className={'container'}>
              <div className="signup">
                {/* Use the Submit handler with our own submit handler*/}
                <form className="widget-form" onSubmit={handleSubmit(this.submit)}>
                    <h1>Signup</h1>
                    <label htmlFor="email">Email</label>
                    <Field
                        name="email"
                        type="text"
                        id="email"
                        className="email"
                        label="Email"
                        component="input"
                    />
                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        id="password"
                        className="password"
                        label="Password"
                        component="input"
                    />
                    <label htmlFor="first_name">First Name</label>
                    <Field
                        name="first_name"
                        type="text"
                        id="first_name"
                        className="first_name"
                        label="first_name"
                        component="input"
                    /><label htmlFor="phone">Last Name</label>
                    <Field
                        name="last_name"
                        type="text"
                        id="last_name"
                        className="last_name"
                        label="last_name"
                        component="input"
                    />

                    <label htmlFor="phone">Phone</label>
                    <Field
                        name="phone"
                        type="text"
                        id="phone"
                        className="phone"
                        label="phone"
                        component="input"
                    />
                      <div>
                    <label>User Type</label>
                        <Field id="userType" name="userType" component={ReduxFormSelect} options={userOptions} />

                        </div>
                    <button style={{'marginTop':'20px'}} action="submit">SIGNUP</button>
                </form>
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
                    {/* Redux Router's <Link> component for quick navigation of routes */}
                    {!requesting && !successful && (
                        <Link to="/login">Already a Member? Login Here »</Link>
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
    signup: state.signupReducer,
})

// Connect our component to redux and attach the "signup" piece
// of state to our "props" in the component.  Also attach the
// "signupRequest" action to our "props" as well.
const connected = connect(mapStateToProps, {signupRequest})(Signup)

// Connect our connected component to Redux Form.  It will namespace
// the form we use in this component as "signup".
const formed = reduxForm({
    form: 'signup',
})(connected)

// Export our well formed component!
export default formed