import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import {addNewProperty, createPropertyFormAction} from "../actions/propertyActions";
import {Field, FieldArray, reduxForm} from "redux-form";
import CreatableSelect from 'react-select/creatable';
import  Select  from "react-select";

const MyDropdown = ({ input, ...props }) => {
 const handleBlur = () => input.onBlur
    const handleChange = () => {
    }
 return (
   <div>
       <CreatableSelect
                     {...input}
          {...props}
        isMulti
        // onChange={this.handleChange()}
        // options={colourOptions}
      />
        {/*<Select.Multi*/}
        {/*    */}
        {/*  instanceId={input.name}*/}
        {/*  {...input}*/}
        {/*  {...props}*/}
        {/*  onBlur={handleBlur}*/}
        {/*/>*/}
   </div>
 )
}

class AddNewProperty extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ]
    }

    // this.onNewOptionClick = this.onNewOptionClick.bind(this)
  }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
        renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} type={type} placeholder={label}/>
          {touched && error && <span>{error}</span>}
        </div>
      </div>
    )
     renderMembers = ({ fields, meta: { touched, error } }) => (
          <ul>
            <li>
              <button type="button" onClick={() => fields.push({})}>Add Member</button>
              {touched && error && <span>{error}</span>}
            </li>
            {fields.map((member, index) =>
              <li key={index}>
                <button
                  type="button"
                  title="X"
                  onClick={() => fields.remove(index)}>X</button>
                <p>Member #{index + 1}</p>
                <Field
                  name={`${member}.firstName`}
                  type="text"
                  component={this.renderField}
                 />
              </li>
            )}
          </ul>
        )

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props; // handleSubmit is provided by reduxForm
        const submit = handleSubmit(createPropertyFormAction); // creating our submit handler by passing our action

        return (
            <Container className="App">
                <header style={{marginBottom: '4rem', textAlign: 'center'}} className="App-header">
                </header>
                <form onSubmit={submit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Field component="input" name="assetId" type="text" placeholder="assetId"
                                       hidden/>
                                <label style={{marginRight: '30px'}}>Type</label>
                            </td>
                            <td>
                                <Field component="input" name="asset_type" type="text" placeholder="asset_type"
                                       />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Creation Date</label></td>
                            <Field name="clubName" type="text" component={this.renderField} label="Club Name"/>
                           <FieldArray name="members" component={this.renderMembers}/>
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
                    </div>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = ({myPropertyReducer}) => ({
});

const mapDispatchToProps = dispatch => ({
    addNewProperty: (propertyObject) => dispatch(addNewProperty(propertyObject)),
});
AddNewProperty = reduxForm({form: 'property'})(AddNewProperty)
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddNewProperty);