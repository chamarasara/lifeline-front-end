import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEmployee, editMasterEmployee,  } from '../../../../actions';
class EditMasterEmployee extends React.Component {
    componentDidMount() {
        this.props.fetchEmployee(this.props.match.params.id);       
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
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderProductsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>

                    {fields.map((products, index) => <li key={index}>
                        <label htmlFor={products}>Product #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${products}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.editMasterEmployee(this.props.employee._id, formValues)        
    }
    render() {
        if (!this.props.employee) {
            return <div><div className="ui active inline loader"></div></div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Employee Details</h3>
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
                                    <option value="Eng">Dr</option>
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
                            <Link to={`/employee-master-profile/${this.props.match.params.id}`} className="ui button">Back</Link>
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
    if (!formValues.products || !formValues.products.length) {
        errors.products = { _error: 'At least one product must be entered' }
    }
    if (!formValues.distributorName) {
        errors.distributorName = 'Required';
    }
    if (!formValues.companyName) {
        errors.companyName = 'Required';
    }
    if (!formValues.mobileNo1) {
        errors.mobileNo1 = 'Required';
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
const mapStateToProps = (state, ownPorps) => {
    const products = Object.values(state.finishGoods) 
    const employee = state.employee[ownPorps.match.params.id] 
    console.log(employee)
    return { errorMessage: state, employee: employee, products: products, initialValues: employee };
}
const formWrapped = reduxForm({
    form: 'editEmployee',
    validate: validate
})(EditMasterEmployee);
export default connect(mapStateToProps, { fetchEmployee, editMasterEmployee,  })(formWrapped);