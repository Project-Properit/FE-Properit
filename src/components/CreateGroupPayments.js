import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import {createGroupPaymentsFormAction} from "../actions/groupsPaymentsActions";
import {loadProperty} from "../actions/propertyActions"
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {clearUsers, loadUser} from "../actions/userActions";
import Loading from "./Loading";
import Switch from "react-switch";
import "./styles.css"
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Input from "@material-ui/core/Input";

class CreateGroupPayments extends Component {
    constructor() {
        super();
        this.state = {amounts: {}, totalAmount: 0, sumAllAmounts: 0};
    }

    componentDidMount() {
        const {propId} = this.props.match.params;
        this.props.loadProperty(propId);
        this.send_users_load = false
    }

    componentWillUnmount() {
        this.props.clearUsers()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.send_users_load && this.props.all_users_were_load.length !== this.props.initialValues.tenant_list.length) {
            this.props.initialValues.tenant_list.map(tenant => this.props.loadUser(tenant))
            this.send_users_load = true
        }
    }

    render() {
        const {propId} = this.props.match.params;
        const {handleSubmit, pristine, reset, submitting} = this.props; // handleSubmit is provided by reduxForm
        const submit = handleSubmit(createGroupPaymentsFormAction); // creating our submit handler by passing our action
        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Payments - {propId}</h2>
                </header>

                <Loading loading={this.props.isLoading}/>
                <div>
                    <Input name="assetId" type="text" placeholder="assetId" hidden/>
                    <Input name="title" type="text" placeholder="title"/>
                    <Input name="description" type="text" placeholder="description"/>
                    <Input onChange={(e) => {this.setTotalAmount(e)}} name="amount" type="number" placeholder="amount"
                                       value={this.state.sumAllAmounts ? this.state.sumAllAmounts : "amount"}/>
                    {this.props.all_users_were_load.map(tenant => (
                        <div key={tenant.email}>
                            <Col style={{margin: '1rem'}}>
                                <Card border={null} style={{width: "18rem"}}>
                                    <Card.Body>
                                        <Card.Title>
                                            <p style={{float: 'left'}}>
                                                <b>{tenant ? tenant.first_name : null}</b></p>
                                            {/*<div style={{width:'4rem'}}></div>*/}
                                            <div style={{clear: 'both'}}/>
                                        </Card.Title>
                                        <Input onChange={(e) => {
                                            this.checkTotalAmount(e, tenant.email)
                                        }} name="amount" type="number" placeholder={"Amount"}
                                               value={this.state.amounts[tenant.email] ? this.state.amounts[tenant.email] : "Amount"}/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                                ))}
                    <div>
                        <button type="submit" onSubmit={submit}>Save</button>
                    </div>
                </div>
                <div>
                    {this.props.error}
                </div>
            </Container>
        )
    }

    checkTotalAmount(e, email) {
        this.setNewAmount(email, e.target.value)
        this.setState({sumAllAmounts: 0})
        Object.entries(this.state.amounts).map(([key, value]) => this.setState({
            sumAllAmounts: this.state.sumAllAmounts + parseInt(value)
        }))
        console.log(this.state.sumAllAmounts)

    }

    setTotalAmount(e) {
        this.setState({totalAmount: parseInt(e.target.value)})
        let amount = e.target.value / this.props.all_users_were_load.length;
        this.props.all_users_were_load.forEach(tenant => this.setNewAmount(tenant.email, amount))
    }

    setNewAmount(email, amount) {
        let amounts = this.state.amounts
        amounts[email] = amount
        this.setState(amounts)
    }

}

CreateGroupPayments = reduxForm({form: 'groupPayments'})(CreateGroupPayments)


const mapStateToProps = ({myPropertyReducer, userReducer, state}) => ({
    isLoading: myPropertyReducer.isLoading,
    myProperty: myPropertyReducer.myProperty,
    error: myPropertyReducer.error,
    initialValues: myPropertyReducer.initialValues,
    all_users_were_load: userReducer.all_users_were_load,
    isLoaded: userReducer.isLoaded
});

const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    loadUser: (userId) => dispatch(loadUser(userId)),
    clearUsers: () => dispatch(clearUsers())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateGroupPayments);