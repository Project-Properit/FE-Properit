import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Switch from "react-switch";
import {createGroupPropertyFormAction} from "../actions/groupPaymentsActions";
import {loadProperty} from "../actions/propertyActions"
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loadUser} from "../actions/userActions";
import Loading from "./Loading";
import {loginApi} from "../api";
import UserPaymentCard from "./UserPaymentCard";
import divWithClassName from "react-bootstrap/cjs/divWithClassName";

class CreateGroupPayments extends Component {
    componentDidMount() {
        const {propId} = this.props.match.params;
        this.props.loadProperty(propId);
    }

    render() {
        const {propId} = this.props.match.params;
        const {handleSubmit, pristine, reset, submitting} = this.props; // handleSubmit is provided by reduxForm
        const submit = handleSubmit(createGroupPropertyFormAction); // creating our submit handler by passing our action
        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2> Payments - {propId}</h2>
                </header>

                <Loading loading={this.props.isLoading}/>

                <form onSubmit={submit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Field component="input" name="assetId" type="text" placeholder="assetId"
                                       hidden/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Title</label></td>
                            <td>
                                <Field component="input" name="title" type="text" placeholder="title"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Description</label></td>
                            <td>
                                <Field component="input" name="description" type="text" placeholder="description"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Amount</label></td>
                            <td>
                                <Field component="input" name="amount" type="number" placeholder="amount"/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/*<div>*/}
                    {/*    <Switch onChange={this.handleChange} checked={this.checked}/>*/}
                    {/*</div>*/}
                    <Loading loading={this.props.isLoading}/>
                    {this.props.initialValues.tenant_list.map((tenant,index) => (
                        <div key={index}>
                            {console.log(tenant)}
                            <UserPaymentCard userId={tenant}/>
                        </div>

                    ))}
                    {/*<table key={index}>*/}
                    {/*    {this.getUser(tenant)}*/}
                    {/*    <tbody>*/}
                    {/*    <tr>*/}
                    {/*        <td><label>Tenant</label></td>*/}
                    {/*        <td>*/}
                    {/*            <Field component="input" name="tenant_name" type="text" placeholder={this.props.user ? this.props.user.first_name: null} disabled/>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*    <tr>*/}
                    {/*        <td><label>Custom Amount</label></td>*/}
                    {/*        <td>*/}
                    {/*            <Field component="input" name="amount" type="number" placeholder="Amount"/>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}

                    <div>
                        <button type="submit" disabled={pristine || submitting}>Save</button>
                    </div>
                </form>
                <div>
                    {this.props.error}
                </div>

            </Container>
        )
    }
    getUser(userId)  {
        this.props.loadUser(userId)
    }

}

const mapStateToProps = ({myPropertyReducer, userReducer}) => ({
    isLoading: myPropertyReducer.isLoading,
    myProperty: myPropertyReducer.myProperty,
    error: myPropertyReducer.error,
    initialValues: myPropertyReducer.initialValues,
    user: userReducer.user
});

const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    loadUser: (userId) => dispatch(loadUser(userId))
});

CreateGroupPayments = reduxForm({form: 'groupPayments'})(CreateGroupPayments)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateGroupPayments);