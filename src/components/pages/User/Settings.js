import React, {Component} from 'react'
import {connect} from 'react-redux'
import FadeIn from "react-fade-in";
import {Button, TextField} from "@material-ui/core";
import "./register.css";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import avatar from "../../../images/avatar-black2.png";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {clearUsers, loadUser, updateSettingsRequest} from "../../../actions/userActions";
import {updateClient} from "../../../actions/clientActions";
import MyModal from "../Modal";
import SimpleValidationModal from "../Modal/SimpleValidationModal";


class Settings extends Component {
    submit = () => {
        let settingsObject = this.state.user
        delete settingsObject.focus
        settingsObject['userId'] = this.props.userId
        this.props.updateSettingsRequest(settingsObject);
        this.props.updateClient(this.state.user.first_name,this.state.user.last_name)
        this.closeModal()
        this.props.closeHandler()
    }

    componentDidMount() {
        this.props.loadUser(this.props.userId)
    }

    componentWillUnmount() {
        this.props.clearUsers()
        this.setState({set: true})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.set && this.props.user.user.email !== '') {
            let user = this.props.user.user[0]
            if (user.payment_details.cvc) {
            } else {
                user.payment_details = {
                    card_owner: '',
                    card_number: '',
                    valid_date: '',
                    cvc: ''
                }
            }

            this.setState({user: user, set: false})
        }
    }

    state = {
        set: true,
        user: {
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
            email: '',
            user_type: ''
        }
    };

    handleInputFocus = (e) => {
        this.setState({focus: e.target.name});
    }

    cardNumberHandleInputChange = (e) => {

        const {value} = e.target;
        let payment_details = this.state.user.payment_details
        payment_details.card_number = value
        this.setState({payment_details});
    }
    cardOwnerHandleInputChange = (e) => {
        const {value} = e.target;
        let payment_details = this.state.user.payment_details
        payment_details.card_owner = value
        this.setState({payment_details});
    }
    cardDateHandleInputChange = (e) => {
        const {value} = e.target;
        let payment_details = this.state.user.payment_details
        payment_details.valid_date = value
        this.setState({payment_details});
    }
    cardCvcHandleInputChange = (e) => {
        const {value} = e.target;
        let payment_details = this.state.user.payment_details
        payment_details.cvc = value
        this.setState({payment_details});
    }
    emailTypeChanged = (e) => {
        const {value} = e.target;
        let user = this.state.user
        user.email = value
        this.setState({user});
    }
    firstTypeChanged = (e) => {
        const {value} = e.target;
        let user = this.state.user
        user.first_name = value
        this.setState({user});
    }
    lastTypeChanged = (e) => {
        const {value} = e.target;
        let user = this.state.user
        user.last_name = value
        this.setState({user});
    }
    phoneTypeChanged = (e) => {
        const {value} = e.target;
        let user = this.state.user
        user.phone = value
        this.setState({user});
    }

    closeModal = () => {
        this.setState({createConfirmModalOpened: false})
    }
    openModal = () => {
        this.setState({createConfirmModalOpened: true})
    }

    render() {
        // grab what we need from props.  The handleSubmit from ReduxForm
        // and the pieces of state from the global state.
        const {
            update: {
                requesting,
                successful,
                messages,
                errors
            }
        } = this.props.user
        return (
            <div>
                {this.state.createConfirmModalOpened ? <SimpleValidationModal open onApprove={this.submit}
                                                                              closeMe={this.closeModal}/> : null}
                <MyModal open setOpen={this.props.closeHandler} closeMe={this.props.closeHandler}
                         style={{width: "30%"}}>
                    <div style={{textAlign: 'center'}}>
                        <FadeIn className="update-fade">
                            <div className="update-box">
                                <img src={avatar} className="avatar"/>
                                <h1>Settings</h1>
                                <form className="register-panel">
                                    {/*<div className="register-page">*/}
                                    {/*    <form className="register-panel">*/}
                                    <TextField
                                        className="item"
                                        value={this.state.user.email}
                                        onChange={this.emailTypeChanged}
                                        variant="outlined"
                                        label="Email"
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.user.first_name}
                                        onChange={this.firstTypeChanged}
                                        variant="outlined"
                                        label="First Name"
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.user.last_name}
                                        onChange={this.lastTypeChanged}
                                        variant="outlined"
                                        label="Last Name"
                                        required
                                    />
                                    <TextField
                                        className="item"
                                        value={this.state.user.phone}
                                        onChange={this.phoneTypeChanged}
                                        variant="outlined"
                                        label="Phone"
                                        required
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
                                                        cvc={this.state.user.payment_details.cvc}
                                                        expiry={this.state.user.payment_details.valid_date}
                                                        focused={this.state.user.focus}
                                                        name={this.state.user.payment_details.card_owner}
                                                        number={this.state.user.payment_details.card_number}
                                                    />
                                                    <form>
                                                        <input
                                                            type="tel"
                                                            name="payment_details.card_number"
                                                            placeholder="Card Number"
                                                            value={this.state.user.payment_details.card_number}
                                                            onChange={this.cardNumberHandleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                        <input
                                                            type="tel"
                                                            name="name"
                                                            placeholder="Name"
                                                            value={this.state.user.payment_details.card_owner}
                                                            onChange={this.cardOwnerHandleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                        <input
                                                            type="tel"
                                                            name="expiry"
                                                            placeholder="Valid thru"
                                                            value={this.state.user.payment_details.valid_date}
                                                            onChange={this.cardDateHandleInputChange}
                                                            onFocus={this.handleInputFocus}
                                                        />
                                                        <input
                                                            type="tel"
                                                            name="cvc"
                                                            placeholder="CVC"
                                                            value={this.state.user.payment_details.cvc}
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
                                        onClick={this.openModal}
                                    >
                                        Update
                                    </Button>
                                </form>


                            </div>
                        </FadeIn>

                        <div className="auth-messages">
                        </div>
                    </div>
                </MyModal>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.userReducer
})
const mapDispatchToProps = dispatch => ({
    clearUsers: () => dispatch(clearUsers()),
    loadUser: (userId) => dispatch(loadUser(userId)),
    updateSettingsRequest: (all) => dispatch(updateSettingsRequest(all)),
    updateClient: (firstName, lastName) => dispatch(updateClient(firstName, lastName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)