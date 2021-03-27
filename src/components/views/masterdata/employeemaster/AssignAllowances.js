import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { assignAllowances, fetchEmployee } from '../../../../actions';
class AssignAllowances extends React.Component {

    componentDidMount() {
        this.props.fetchEmployee(this.props.match.params.id)
        console.log(this.props.match.params.id)

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
        const basicSalary = this.props.basicSalary
        const epfCompany = basicSalary * 0.12
        const epfEmployee = basicSalary * 0.08
        const etfEmployee = basicSalary * 0.03
        this.props.assignAllowances(this.props.employee._id, { ...formValues, epfCompany, epfEmployee, etfEmployee })
    }
    render() {
        console.log(this.props.employee)
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Assign Allowances</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="four wide field">
                                Basic Salary <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="basicSalary" component={this.renderInput} required placeholder="Basic Salary" type="number" />
                            </div>
                            <div className="four wide field">
                                Vehicle Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="vehicleAllowance" component={this.renderInput} required placeholder="Vehicle Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Fuel Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="fuelAllowance" component={this.renderInput} required placeholder="Fuel Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Transport Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="transportAllowance" component={this.renderInput} required placeholder="Transport Allowance" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Telephone Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="telephoneAllowance" component={this.renderInput} required placeholder="Telephone Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Food Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="foodAllowance" component={this.renderInput} required placeholder="Food Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Insuarance Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="insuaranceCost" component={this.renderInput} required placeholder="Insuarance Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Uniform Allowance (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="uniformCost" component={this.renderInput} required placeholder=" Uniform Allowance" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Accommodation Allowance(Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="accommodationAllowance" component={this.renderInput} required placeholder="Accommodation Allowance" type="number" />
                            </div>
                            <div className="four wide field">
                                Bonus (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="bonus" component={this.renderInput} required placeholder="Bonus" type="number" />
                            </div>
                        </div>
                        <strong>Deductions (-)</strong>
                        <div className="fields">                            
                            <div className="four wide field">
                                Accommodation Employee  (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="accomodationEmployee" component={this.renderInput} required placeholder="Accommodation Employee" type="number" />
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
const selector = formValueSelector('assignAllowances')
const mapStateToProps = (state, ownPorps) => {
    const basicSalary = selector(state, 'basicSalary')
    const employee = state.employee[ownPorps.match.params.id]
    console.log(basicSalary)
    return { errorMessage: state, employee: employee, initialValues: employee, basicSalary };
}
const formWrapped = reduxForm({
    form: 'assignAllowances',
    validate: validate
})(AssignAllowances);
export default connect(mapStateToProps, { assignAllowances, fetchEmployee })(formWrapped);