import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Messages from '../../../../notifications/Messages'
import Errors from '../../../../notifications/Errors'

import signupRequest from '../../../../actions/sugnUpActions'
import Select  from "react-select";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../../images/logoWhite .jpg";
import FadeIn from "react-fade-in";
import {Button, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import UserSelect from '../../../../components/UsersSelect'
import "./register.css";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import avatar from "../../../../images/avatar-black2.png";
//--------
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



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



    submit = (values) => {
        // we could just do signupRequest here with the static proptypes
        // but ESLint doesn't like that very much...
        this.props.signupRequest(values)
    }

    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
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
                <div style={{textAlign:'center'}}>
                    <FadeIn className="register-fade">
                        <div className="register-box">
                            <img src={avatar} className="avatar"/>
                            <h1>Register Here</h1>
                            <form className="register-panel">
                        {/*<div className="register-page">*/}
                        {/*    <form className="register-panel">*/}
                                <TextField
                                    className="item"
                                    value={""}
                                    variant="outlined"
                                    label="Email"
                                    required
                                />
                                <TextField
                                    className="item"
                                    value={""}
                                    variant="outlined"
                                    label="First Name"
                                    required
                                />
                                <TextField
                                    className="item"
                                    value={""}
                                    variant="outlined"
                                    label="Last Name"
                                    required
                                />
                                <TextField
                                    className="item"
                                    value={""}
                                    variant="outlined"
                                    label="Phone"
                                    required
                                />
                                <TextField
                                    id="outlined-end-adornment"
                                    className="item"
                                    variant="outlined"
                                    type={"password"}
                                    value={""}
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
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        // id="panel1a-header"
                                        className="item1"

                                    >
                                        <Typography className="heading">Add payment details</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            <div id="PaymentForm">
                                                <Cards
                                                    cvc={this.state.cvc}
                                                    expiry={this.state.expiry}
                                                    focused={this.state.focus}
                                                    name={this.state.name}
                                                    number={this.state.number}
                                                />
                                                <form>
                                                    <input
                                                        type="tel"
                                                        name="number"
                                                        placeholder="Card Number"
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="name"
                                                        placeholder="Name"
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="expiry"
                                                        placeholder="Valid thru"
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />
                                                    <input
                                                        type="tel"
                                                        name="cvc"
                                                        placeholder="CVC"
                                                        onChange={this.handleInputChange}
                                                        onFocus={this.handleInputFocus}
                                                    />

                                                </form>
                                            </div>
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                {/*<CardForm*/}
                                {/*    onSubmit={this.onSubmit}*/}
                                {/*    getName={true}*/}
                                {/*    getZip={true}*/}
                                {/*/>*/}

                                <Button
                                    className="button"
                                    color="primary"
                                    variant="contained"
                                    style={{ fontWeight: "bold", fontSize: "24px" }}
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
                    {/*<form className="widget-form" onSubmit={handleSubmit(this.submit)}>*/}
                    {/*    <h1>Signup</h1>*/}
                    {/*    <label htmlFor="email">Email</label>*/}
                    {/*    <Field*/}
                    {/*        name="email"*/}
                    {/*        type="text"*/}
                    {/*        id="email"*/}
                    {/*        className="email"*/}
                    {/*        label="Email"*/}
                    {/*        component="input"*/}
                    {/*    />*/}
                    {/*    <label htmlFor="password">Password</label>*/}
                    {/*    <Field*/}
                    {/*        name="password"*/}
                    {/*        type="password"*/}
                    {/*        id="password"*/}
                    {/*        className="password"*/}
                    {/*        label="Password"*/}
                    {/*        component="input"*/}
                    {/*    />*/}
                    {/*    <label htmlFor="first_name">First Name</label>*/}
                    {/*    <Field*/}
                    {/*        name="first_name"*/}
                    {/*        type="text"*/}
                    {/*        id="first_name"*/}
                    {/*        className="first_name"*/}
                    {/*        label="first_name"*/}
                    {/*        component="input"*/}
                    {/*    /><label htmlFor="phone">Last Name</label>*/}
                    {/*    <Field*/}
                    {/*        name="last_name"*/}
                    {/*        type="text"*/}
                    {/*        id="last_name"*/}
                    {/*        className="last_name"*/}
                    {/*        label="last_name"*/}
                    {/*        component="input"*/}
                    {/*    />*/}

                    {/*    <label htmlFor="phone">Phone</label>*/}
                    {/*    <Field*/}
                    {/*        name="phone"*/}
                    {/*        type="text"*/}
                    {/*        id="phone"*/}
                    {/*        className="phone"*/}
                    {/*        label="phone"*/}
                    {/*        component="input"*/}
                    {/*    />*/}
                    {/*      <div>*/}
                    {/*    <label>User Type</label>*/}
                    {/*        <Field id="userType" name="userType" component={ReduxFormSelect} options={userOptions} />*/}

                    {/*        </div>*/}
                    {/*    <button style={{'marginTop':'20px'}} action="submit">SIGNUP</button>*/}
                    {/*</form>*/}
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

                    </div>
                    {/*</div>*/}
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