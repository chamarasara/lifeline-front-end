import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSalary, fetchEmployees } from '../../../../actions';
class NewSalary extends React.Component {

    componentDidMount() {
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
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
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
    onSubmit = (formValues) => {                
        this.props.createSalary(formValues)
    }
    render() {
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
                            <div className="five wide field">
                                Attendace Allowance(Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="attendanceAllowance" component={this.renderInput} required placeholder="Attendance Allowance" type="number" />
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
                        <div className="fields">
                            <div className="four wide field">
                                Salary Advance Recovery (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="salaryAdvance" component={this.renderInput} required placeholder="Salary Advance Recovery " type="number" />
                            </div>                            
                        </div>
                        <div className="field">
                            <Link to={"/salaries-dashboard"} className="ui button">Back</Link>
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
    if (!formValues.month) {
        errors.month = 'Required';
    }
    if (!formValues.employeeId) {
        errors.employeeId = 'Required';
    }    
    return errors;
}
const mapStateToProps = (state) => {
    const employees = Object.values(state.employee)
    return { errorMessage: state, employees };
}
const formWrapped = reduxForm({
    form: 'newSalary',
    validate: validate
})(NewSalary);
export default connect(mapStateToProps, { createSalary, fetchEmployees })(formWrapped);