import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEmployee } from '../../../../actions';
class NewEmployee extends React.Component {


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
        console.log(formValues)
        this.props.createEmployee(formValues)
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create New Employee</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="three wide field">
                                Status <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="status" component={this.renderSelectField} placeholder="Country" type="text" >
                                    <option>-Select Status-</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Dr">Dr</option>
                                    <option value="Eng">Eng</option>
                                </Field>
                            </div>
                            <div className="twelve wide field">
                                Employee Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="employeeName" component={this.renderInput} required placeholder="Employee Name" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Contact Number <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="contactNumber" component={this.renderInput} required placeholder="Contact Number" type="text" />
                            </div>
                            <div className="four wide field">
                                Guardian Number <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="guardianNumber" component={this.renderInput} required placeholder="Guardian Number" type="text" />
                            </div>
                            <div className="seven wide field">
                                Email (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="email" component={this.renderInput} required placeholder="Email" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                NIC Number <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="idNumber" component={this.renderInput} required placeholder="NIC Number" type="text" />
                            </div>
                            <div className="five wide field">
                                Passport/Driving License Number (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="otherIdNumber" component={this.renderInput} required placeholder="NIC/Passport/Driving License Number" type="text" />
                            </div>
                            <div className="five wide field">
                                Birthday <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="birthDay" component={this.renderInput} placeholder="Fax" type="date" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fifteen wide field">
                                Permenant Address <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="permenantAddress" component={this.renderInput} required="true" placeholder="Permenant Address" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fifteen wide field">
                                Temporary Address <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="temporaryAddress" component={this.renderInput} required="true" placeholder="Temporary Address" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                Company Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="companyName" component={this.renderSelectField} placeholder="Company Name" type="text" >
                                    <option>-Select Company-</option>
                                    <option value="Lifeguard Manufacturing (Pvt) Ltd">Lifeguard Manufacturing (Pvt) Ltd</option>
                                    <option value="Lifeline Software Solutions (Pvt) Ltd">Lifeline Software Solutions (Pvt) Ltd</option>
                                    <option value="Consultancy">Consultancy</option>
                                </Field>
                            </div>
                            <div className="five wide field">
                                Designantion <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="designation" component={this.renderInput} required placeholder="Designantion" type="text" />
                            </div>
                            <div className="five wide field">
                                Employee Status <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="employeeStatus" component={this.renderSelectField} placeholder="Employee Status " type="text" >
                                    <option>-Select Status-</option>                                    
                                    <option value="Temporary">Temporary</option>
                                    <option value="On Probation">On Probation</option>
                                    <option value="Permenant">Permenant</option>
                                    <option value="Consultant">Consultant</option>
                                    <option value="Terminated">Terminated</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                Joined Date <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="joinedDate" component={this.renderInput} placeholder="Joined Date" type="date" />
                            </div>
                            <div className="five wide field">
                                Probation Period (Months)<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="probationPeriod" component={this.renderInput} placeholder="Probation Period" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                EPF Number (Optional)
                                <Field name="epfNumber" component={this.renderInput} placeholder="EPF Number" type="text" />
                            </div>
                            <div className="five wide field">
                                ETF Number (Optional)
                                <Field name="etfNumber" component={this.renderInput} placeholder="ETF Number" type="text" />
                            </div>
                            <div className="five wide field">
                                Insuarance Policy Number (Optional)
                                <Field name="insuarancePolicyNumber" component={this.renderInput} placeholder="Insuarance Policy" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/employee-dashboard"} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
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
    if (!formValues.status) {
        errors.status = 'Required';
    }
    if (!formValues.employeeName) {
        errors.employeeName = 'Required';
    }
    if (!formValues.contactNumber) {
        errors.contactNumber = 'Required';
    }
    if (!formValues.guardianNumber) {
        errors.guardianNumber = 'Required';
    }
    if (!formValues.idNumber) {
        errors.idNumber = 'Required';
    }
    if (!formValues.birthDay) {
        errors.birthDay = 'Required';
    }
    if (!formValues.permenantAddress) {
        errors.permenantAddress = 'Required';
    }    
    if (!formValues.companyName) {
        errors.companyName = 'Required';
    }
    if (!formValues.designation) {
        errors.designation = 'Required';
    }
    if (!formValues.employeeStatus) {
        errors.employeeStatus = 'Required';
    }
    if (!formValues.joinedDate) {
        errors.joinedDate = 'Required';
    }
    if (!formValues.probationPeriod) {
        errors.probationPeriod = 'Required';
    }
    // if (!formValues.epfNumber) {
    //     errors.epfNumber = 'Required';
    // }
    // if (!formValues.etfNumber) {
    //     errors.etfNumber = 'Required';
    // }
    // if (!formValues.insuarancePolicyNumber) {
    //     errors.insuarancePolicyNumber = 'Required';
    // }
    return errors;
}
// const mapStateToProps = (state) => {
//     const userRoles = Object.values(state.userRoles)
//     const products = Object.values(state.finishGoods)
//     return { errorMessage: state, userRoles: userRoles, products: products };
// }
const formWrapped = reduxForm({
    form: 'newEmployee',
    validate: validate
})(NewEmployee);
export default connect(null, { createEmployee })(formWrapped);