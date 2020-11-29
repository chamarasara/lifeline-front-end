import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCustomer, editCustomer } from '../../../actions';
class EditCustomer extends React.Component {
    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id);
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
    renderInput = ({ input, label, placeholder, type , meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.editCustomer(this.props.customer._id,formValues)
        console.log(formValues)
    }  
    render() {
        if (!this.props.customer) {
            return <div>Customer not selected. Please select a Customer from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h5>Edit Customer Details</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <Field name="customerName" component={this.renderInput} value ={this.props.customer.customerName} placeholder={this.props.customer.customerName} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mobileNo1" component={this.renderInput} placeholder={this.props.customer.mobileNo} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="mobileNo2" component={this.renderInput} placeholder={this.props.customer.mobileNo} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="fax" component={this.renderInput} placeholder={this.props.customer.fax} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerNo" component={this.renderInput} placeholder={this.props.customer.registerNo} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="email" component={this.renderInput} placeholder={this.props.customer.email} type="text" />
                            </div>
                        </div>  
                        <div className="fields">
                            <div className="ten wide field">
                                <Field name="companyName" component={this.renderInput} placeholder="Company Name" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="debitPeriod" component={this.renderInput} placeholder="Debit Period" type="number" />
                            </div>
                        </div>                    
                        <div className="fields">
                            <div className="five wide field">
                                <label>Communication Address- </label>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <Field name="communicationAddress.no" component={this.renderInput} placeholder={this.props.customer.communicationAddress.no} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.lane" component={this.renderInput} placeholder={this.props.customer.communicationAddress.lane} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.city" component={this.renderInput} placeholder={this.props.customer.email} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.postalCode" component={this.renderInput} placeholder={this.props.customer.communicationAddress.postalCode} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="communicationAddress.country" component="select" placeholder={this.props.customer.communicationAddress.country} type="text" >
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
                                <Field name="registerAddress.no2" component={this.renderInput} placeholder={this.props.customer.registerAddress.no2} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.lane2" component={this.renderInput} placeholder={this.props.customer.registerAddress.lane2} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.city2" component={this.renderInput} placeholder={this.props.customer.registerAddress.city2} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.postalCode2" component={this.renderInput} placeholder={this.props.customer.registerAddress.postalCode2} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="registerAddress.country2" component="select" placeholder={this.props.customer.registerAddress.country2} type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="state" component="select" placeholder={this.props.customer.state} type="text" >
                                    <option>-Select Nationality-</option>
                                    <option value="local">Local</option>
                                    <option value="foriegn">Foreign</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="currency" component="select" placeholder={this.props.customer.currency} type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR">LKR</option>
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </Field>
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/customer-profile/${this.props.customer._id}`} className="ui button">
                                Back
                            </Link>
                            <button type="submit" className="ui primary button">Update</button>
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
    console.log(state)
    return { customer: state.customer[ownPorps.match.params.id], initialValues: state.customer[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editCustomer'
    //validate: validate
})(EditCustomer);
export default connect(mapStateToProps, { fetchCustomer, editCustomer })(formWrapped);