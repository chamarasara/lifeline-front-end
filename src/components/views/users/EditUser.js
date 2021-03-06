import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import { fetchUser, fetchUsersRoles, editUser } from '../../../actions';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    componentDidMount(){
        this.props.fetchUser(this.props.match.params._id)
        this.props.fetchUsersRoles()
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
    renderUserRolesList(){
        return this.props.userRoles.map(userRoles => {
            return (
                <option key={userRoles._id} value={userRoles.userTypeName}>{userRoles.userTypeName}</option>
            )
        })
    }
    submit = (formValues) => {
        this.props.editUser(this.props.match.params._id, formValues)
        
    }
    render() {
        if (!this.props.user) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h5>Edit Profile</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.submit)}>
                        <div className="fields">
                            <div className="six wide field">
                                <Field name="firstName" component={this.renderInput} label="First Name" placeholder={this.props.user.firstName} type="text" />
                            </div>
                            <div className="six wide field">
                                <Field name="lastName" component={this.renderInput} label="Last Name" placeholder={this.props.user.lastName} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mobileNo" component={this.renderInput} label="Mobile Number" placeholder={this.props.user.mobileNo} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="nic" component={this.renderInput} label="Identity Card Number" placeholder={this.props.user.nic} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="email" component={this.renderInput} label="Email" placeholder={this.props.user.email} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="birthDay" component={this.renderInput} label="Birth Day" placeholder={this.props.user.birthDay} type="date" />
                            </div>
                            <div className="two wide field">
                                <label>Gender</label>
                                <Field name="gender" component="select" label="Gender" placeholder={this.props.user.gender} type="text" >
                                    <option />
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                        </div>
                        <label>Address- </label>
                        <div className="fields">
                            <div className="two wide field">
                                <label>No</label>
                                <Field name="address.no" component={this.renderInput} placeholder={this.props.user.address.no} type="text" />
                            </div>
                            <div className="four wide field">
                                <label>Lane</label>
                                <Field name="address.lane" component={this.renderInput} placeholder={this.props.user.address.lane} type="text" />
                            </div>
                            <div className="four wide field">
                                <label>City</label>
                                <Field name="address.city" component={this.renderInput} placeholder={this.props.user.address.city} type="text" />
                            </div>
                            <div className="four wide field">
                                <label>Postal Code</label>
                                <Field name="address.postalCode" component={this.renderInput} placeholder={this.props.user.address.postalCode} type="text" />
                            </div>
                            <div className="four wide field">
                                <label>Country</label>
                                <Field name="address.country" component="select" placeholder={this.props.user.address.country} type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <label>User Role</label>
                                <Field name="userRole.userTypeName" component="select" label="User Role" placeholder={this.props.user.userType}>
                                    <option>-Select User Role-</option>
                                    {this.renderUserRolesList()}
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="userName" component={this.renderInput} label="Username" placeholder={this.props.user.userName} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="password" component={this.renderInput} label="Password" placeholder="**************" type="password" />
                            </div>
                        </div>
                        <div className="fields">                            
                            <div className="four wide field">  
                                <label>Upload Profile Picture</label>                             
                                <ImageUploader
                                    withIcon={false}
                                    className="avatar"
                                    buttonText='Choose image'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
//Form input validation
// const validate = (formValues) => {
//     const errors = {}
//     if (!formValues.firstName) {
//         errors.firstName = 'Please enter First Name';
//     }
//     if (!formValues.lastName) {
//         errors.lastName = 'Please enter Last Name';
//     }
//     if (!formValues.address) {
//         errors.address = 'Please enter the Number of the Address';
//     }
//     if (!formValues.nic) {
//         errors.nic = 'Please enter the ID Nummber';
//     }
//     if (!formValues.mobileNo) {
//         errors.mobileNo = 'Please enter Phone Number';
//     }
//     if (!formValues.email) {
//         errors.email = 'Please enter Email';
//     }
//     if (!formValues.gender) {
//         errors.gender = 'Please enter the Gender';
//     }
//     return errors;
// }
const mapStateToProps = (state, ownPorps) => {
    const userRoles = Object.values(state.userRoles)
    return { errorMessage: state, user: state.users[ownPorps.match.params._id], userRoles: userRoles, initialValues: state.users[ownPorps.match.params._id] };
}
const formWrapped = reduxForm({
    form: 'editUser',
    //validate: validate
})(EditUser);
export default connect(mapStateToProps, { fetchUser, fetchUsersRoles, editUser })(formWrapped);