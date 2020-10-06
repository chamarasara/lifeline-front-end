import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createSupplier } from '../../../actions';
class NewSupplier extends React.Component {
   
    communicationAddress = {
        city: "",
        country: "",
        lane: "",
        no: "",
        postalCode: ""
    }
    registerAddress = {
        city2: "",
        country2: "",
        lane2: "",
        no2: "",
        postalCode2: ""
    }
    // usersType = {
    //     id: "",
    //     userTypeCode: "",
    //     userTypeName: "",
    //     permissions: []
    // }
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
    onSubmit = (formValues) => {
        this.props.createSupplier(formValues)
        console.log(formValues)
    }
    
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h5>Create New Supplier</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <Field name="supplierName" component={this.renderInput} placeholder="Full Name" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mobileNo" component={this.renderInput} placeholder="Contact Number" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="fax" component={this.renderInput} placeholder="Fax" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerNo" component={this.renderInput} placeholder="Registration Number" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="email" component={this.renderInput} placeholder="Email" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="ten wide field">
                                <Field name="companyName" component={this.renderInput} placeholder="Company Name" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                <label>Communication Address- </label>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <Field name="communicationAddress.no" component={this.renderInput} placeholder="No" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.lane" component={this.renderInput} placeholder="Lane" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.city" component={this.renderInput} placeholder="City" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.postalCode" component={this.renderInput} placeholder="Postal Code" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.country" component="select" placeholder="Country" type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                <label>Registered Address- </label>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <Field name="registerAddress.no2" component={this.renderInput} placeholder="No" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.lane2" component={this.renderInput} placeholder="Lane" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.city2" component={this.renderInput} placeholder="City" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.postalCode2" component={this.renderInput} placeholder="Postal Code" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.country2" component="select" placeholder="Country" type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                            
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="state" component="select" placeholder="Country" type="text" >
                                    <option>-Select Nationality-</option>
                                    <option value="local">Local</option>
                                    <option value="foriegn">Foreign</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="currency" component="select" placeholder="Country" type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR">LKR</option>
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name="creditPeriod" component={this.renderInput} placeholder="Credit Period" type="number" />
                            </div>
                        </div>                                            
                        <div className="field">
                            <button type="submit" className="ui primary button">Add New Supplier</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
// //Form input validation
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
// const mapStateToProps = (state) => {
//     console.log(state)
//     const userRoles = Object.values(state.userRoles)
//     console.log(userRoles)
//     return { errorMessage: state, supplier: userRoles };
// }
const formWrapped = reduxForm({
    form: 'newSupplier'
})(NewSupplier);
export default connect(null, { createSupplier})(formWrapped);