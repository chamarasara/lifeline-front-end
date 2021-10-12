import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSupplier } from '../../../actions';
class NewSupplier extends React.Component {

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
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    renderSelectField = ({ input, label, type, meta, children }) => (
        <div>
            <label>{label}</label>
            <div>
                <select {...input}>
                    {children}
                </select>
                {this.renderError(meta)}
            </div>
        </div>
    )
    onSubmit = (formValues) => {
        this.props.createSupplier(formValues)
    }

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h3>Create New Supplier</h3>
                        <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    Company Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="companyName" component={this.renderInput} placeholder="Company Name" type="text" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="four wide field">
                                    Contact Number 1 <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="mobileNo1" component={this.renderInput} placeholder="Contact Number 1" type="text" />
                                </div>
                                <div className="four wide field">
                                    Contact Number 2 (Optional)
                                    <Field name="mobileNo2" component={this.renderInput} placeholder="Contact Number 2" type="text" />
                                </div>
                                <div className="four wide field">
                                    Fax (Optional)
                                    <Field name="fax" component={this.renderInput} placeholder="Fax" type="text" />
                                </div>
                                <div className="four wide field">
                                    Registration Number (Optional)
                                    <Field name="registerNo" component={this.renderInput} placeholder="Registration Number" type="text" />
                                </div>
                                <div className="four wide field">
                                    Email
                                    <Field name="email" component={this.renderInput} placeholder="Email" type="text" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="eight wide field">
                                    Contact Person Name (Optional)
                                    <Field name="supplierName" component={this.renderInput} placeholder="Contact Person Name" type="text" />
                                </div>
                                <div className="four wide field">
                                    Credit Period <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="creditPeriod" component={this.renderInput} placeholder="Credit Period(Days)" type="number" />
                                </div>
                                <div className="four wide field">
                                    Credit Amount <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="creditAmount" component={this.renderInput} placeholder="Credit Amount" type="number" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="five wide field">
                                    Communication Address-<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    No <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.no" component={this.renderInput} placeholder="No" type="text" />
                                </div>
                                <div className="four wide field">
                                    Lane <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.lane" component={this.renderInput} placeholder="Lane" type="text" />
                                </div>
                                <div className="four wide field">
                                    City <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.city" component={this.renderInput} placeholder="City" type="text" />
                                </div>
                                <div className="four wide field">
                                    Postal Code <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.postalCode" component={this.renderInput} placeholder="Postal Code" type="text" />
                                </div>
                                <div className="four wide field">
                                    Country <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.country" component={this.renderSelectField} placeholder="Country" type="text" >
                                        <option>-Select Country-</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="India">India</option>
                                        <option value="China">China</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="three wide field">
                                    Nationality <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="state" component={this.renderSelectField} placeholder="state" type="text" >
                                        <option>-Select Nationality-</option>
                                        <option value="local">Local</option>
                                        <option value="foriegn">Foreign</option>
                                    </Field>
                                </div>
                                <div className="three wide field">
                                    Currency <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="currency" component={this.renderSelectField} placeholder="currency" type="text" >
                                        <option>-Select Currency-</option>
                                        <option value="LKR">LKR</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/supplier"} className="ui button">Back</Link>
                                <button type="submit" className="ui primary button">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.companyName) {
        errors.companyName = 'Required';
    }
    if (!formValues.mobileNo1) {
        errors.mobileNo1 = 'Required';
    }
    if (!formValues.email) {
        errors.email = 'Required';
    }
    if (!formValues.creditPeriod) {
        errors.creditPeriod = 'Required';
    }
    if (!formValues.creditAmount) {
        errors.creditAmount = 'Required';
    }
    if (!formValues.state) {
        errors.state = 'Required';
    }
    if (!formValues.currency) {
        errors.currency = 'Required';
    }
    if (!formValues.communicationAddress) {
        errors.communicationAddress = { no: "Required", lane: "Required", city: "Required", postalCode: "Required", country: "Required" };
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'newSupplier',
    validate: validate
})(NewSupplier);
export default connect(null, { createSupplier })(formWrapped);