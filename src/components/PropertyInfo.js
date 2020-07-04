import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import {clearProperty, loadProperty,removeProperty, updatePropertyFormAction} from "../actions/propertyActions";
import {Field, reduxForm} from "redux-form";

class PropertyInfo extends Component {
    componentDidMount() {
        const {propId} = this.props.match.params;
        this.props.loadProperty(propId)
    }

    componentWillUnmount() {
        this.props.clearProperty()
    }

    render() {
        const {propId} = this.props.match.params;
        const {handleSubmit, pristine, reset, submitting} = this.props; // handleSubmit is provided by reduxForm
        const submit = handleSubmit(updatePropertyFormAction); // creating our submit handler by passing our action

        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                    <h2>Properties- {propId}</h2>
                </header>
                <form onSubmit={submit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Field component="input" name="assetId" type="text" placeholder="assetId" hidden/>
                                <label style={{marginRight: '30px'}}>Type</label>
                            </td>
                            <td>
                                <Field component="input" name="asset_type" type="text" placeholder="asset_type" disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Creation Date</label></td>
                            <td>
                                <Field component="input" name="creation_date" type="text" placeholder="creation_date" disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Tenants</label></td>
                            <td>
                                <Field component="input" name="tenant_list" type="text" placeholder="tenant_list"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Address</label></td>
                            <td>
                                <Field component="input" name="address" type="text" placeholder="address"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>comments</label></td>
                            <td>
                                <Field component="input" name="comments" type="text" placeholder="comments"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>rent fee</label></td>
                            <td>
                                <Field component="input" name="rent_fee" type="number" placeholder="rent fee"/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>room num</label></td>
                            <td><Field component="input" name="room_num" type="number" placeholder="room num"/></td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>Save</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Undo Changes
                        </button>
                        <button type="button" onClick={()=>this.props.removeProperty(propId)}>Delete</button>
                    </div>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = ({myPropertyReducer}) => ({
    isLoading: myPropertyReducer.isLoading,
    myProperty: myPropertyReducer.myProperty,
    error: myPropertyReducer.error,
    initialValues: myPropertyReducer.initialValues
});

const mapDispatchToProps = dispatch => ({
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    clearProperty: () => dispatch(clearProperty()),
    removeProperty: (propertyId) => dispatch(removeProperty(propertyId)),
});
PropertyInfo = reduxForm({form: 'property'})(PropertyInfo)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PropertyInfo);