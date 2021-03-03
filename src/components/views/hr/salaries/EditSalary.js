import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSalary, fetchEmployees, editSalary  } from '../../../../actions';
class EditSalary extends React.Component {
    componentDidMount() {
        this.props.fetchSalary(this.props.match.params.id); 
        this.props.fetchEmployees()      
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
    renderEmployees() {
        return this.props.employees.map(employee => {
            return (
                <option key={employee._id} value={employee.id}>{employee.employeeName}</option>
            )
        })
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
        console.log(formValues)
        this.props.editSalary(this.props.salary._id, formValues)        
    }
    render() {
        if (!this.props.salary) {
            return <div><div className="ui active inline loader"></div></div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create New Record</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="five wide field">
                                Select Employee <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="employeeId" component={this.renderSelectField} type="text" >
                                    <option>-Select Employee-</option>
                                    {this.renderEmployees()}
                                </Field>
                            </div>
                            <div className="five wide field">
                                Month <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="month" component={this.renderSelectField} type="text" >
                                    <option>-Select Month-</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                OT Hours (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="overTimeHours" component={this.renderInput} required placeholder="OT Hours" type="number" />
                            </div>
                            <div className="five wide field">
                                OT Rate per hour (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="overTimeRate" component={this.renderInput} required placeholder="OT Rate per hour" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Company Loan Recovery (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="loanRecovery" component={this.renderInput} required placeholder="Company Loan Recovery " type="number" />
                            </div>
                            <div className="three wide field">
                                Stamp Duty (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="stampDuty" component={this.renderInput} required placeholder="Stamp Duty" type="number" />
                            </div>
                            <div className="three wide field">
                                No Pay (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="noPay" component={this.renderInput} required placeholder="No Pay" type="number" />
                            </div>
                        </div>                      
                        <div className="field">
                            <Link to={`/single-salary/${this.props.salary.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const validate = (formValues) => {
    const errors = {}
    if (!formValues.basicSalary) {
        errors.basicSalary = 'Required';
    }
    if (!formValues.employeeId) {
        errors.employeeId = 'Required';
    }
    if (!formValues.fixedAllowance) {
        errors.fixedAllowance = 'Required';
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
const mapStateToProps = (state, ownPorps) => {
    const salary = state.salary[ownPorps.match.params.id]
    const employees = Object.values(state.employee)
    return { salary, initialValues: salary, employees };
}
const formWrapped = reduxForm({
    form: 'editEmployee',
    validate: validate
})(EditSalary);
export default connect(mapStateToProps, { fetchSalary, fetchEmployees, editSalary  })(formWrapped);