import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, fetchUsersRoles } from '../../../actions';

class NewUser extends React.Component{
    componentDidMount(){
        this.props.fetchUsersRoles();
    }
    address = {
        city:"",
        country:"",
        lane:"",
        no: "",
        postalCode:""
    }
    userRole = {
        id: "",
        userTypeCode: "",
        userTypeName: "",
        permissions:[]
    }
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    errorMessage() {
        if (this.props.errorMessage) {
            console.log(this.props)
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues ) => {
        //formValues.userType.id = parseInt(formValues.userType.id)
        this.props.createUser(formValues)
    }
    renderRolesList(){
        return this.props.userRoles.map(userRoles => {
            return (
                <option key={userRoles._id} value={userRoles.userTypeName}>{userRoles.userTypeName}</option>
            )
        })
    }
    render(){
        return(
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h5>Create User</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="six wide field">
                                <Field name="firstName" component={this.renderInput}  placeholder="First Name" type="text" />
                            </div>
                            <div className="six wide field">
                                <Field name="lastName" component={this.renderInput}  placeholder="Last Name" type="text" />
                            </div>                            
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mobileNo" component={this.renderInput}  placeholder="Mobile No" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="nic" component={this.renderInput}  placeholder="Identity Card Number" type="text" />
                            </div>    
                            <div className="four wide field">
                                <Field name="email" component={this.renderInput}  placeholder="Email" type="text" />
                            </div>                                                   
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="birthDay" component={this.renderInput} label="Birth Day" placeholder="Birth Date" type="date" />
                            </div>
                            <div className="two wide field">
                                <label>Gender</label>
                                <Field name="gender" component="select" label="Gender" placeholder="Gender" type="text" >
                                    <option>-Gender-</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div> 
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <label>Address- </label>
                            </div>
                        </div>
                        <div className="fields">                                                       
                            <div className="two wide field">                                
                                <Field name="address.no" component={this.renderInput}  placeholder="No" type="text" />                                                                
                            </div>
                            <div className="four wide field">
                                <Field name="address.lane" component={this.renderInput} placeholder="Lane" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="address.city" component={this.renderInput} placeholder="City" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="address.postalCode" component={this.renderInput} placeholder="Postal Code" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="address.country" component="select" placeholder="Country" type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">   
                            <div className="four wide field">
                                <Field name="userRole.userTypeName" component="select" label="User Role" placeholder="User Role" type="number">
                                    <option>-Select User Role-</option>
                                    {this.renderRolesList()}
                                </Field>
                            </div> 
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="userName" component={this.renderInput}  placeholder="Username" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="password" component={this.renderInput}  placeholder="Password" type="password" />
                            </div>                            
                        </div>
                        <div className="field">
                            <Link to={"employee"} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Add New User</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.firstName) {
        errors.firstName = 'Please enter First Name';
    }
    if (!formValues.lastName) {
        errors.lastName = 'Please enter Last Name';
    }
    if (!formValues.address) {
        errors.address = 'Please enter the Number of the Address';
    }
    if (!formValues.nic) {
        errors.nic = 'Please enter the ID Nummber';
    }
    if (!formValues.mobileNo) {
        errors.mobileNo = 'Please enter Phone Number';
    }
    if (!formValues.email) {
        errors.email = 'Please enter Email';
    }
    if (!formValues.gender) {
        errors.gender = 'Please enter the Gender';
    }
    return errors;
}
const mapStateToProps = (state) => {
    console.log(state)
    const userRoles = Object.values(state.userRoles)
    console.log(userRoles)
    return { errorMessage: state, userRoles: userRoles };
} 
const formWrapped = reduxForm({
    form: 'newUser',
    validate: validate
})(NewUser);
export default connect(mapStateToProps, { createUser, fetchUsersRoles })(formWrapped);