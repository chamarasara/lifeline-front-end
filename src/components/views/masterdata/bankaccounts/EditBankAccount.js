import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchBankAccount, editBankAccount } from '../../../../actions';
import { Link } from 'react-router-dom'



class EditBankAccount extends React.Component {

    componentDidMount() {
        this.props.fetchBankAccount(this.props.match.params.id)
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
    renderInput = ({ input, label, placeholder, type, meta, checked }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} checked={checked} autoComplete="off" />
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
        this.props.editBankAccount(formValues._id,formValues)

    }
    renderSuccessMessage() {
        if (this.props.bankAccountMasterState[1] === 200 || this.props.bankAccountMasterState[2] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px", paddingRight: "30px" }}>
                        <h4>Edit Bank Account</h4>
                        <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="fields">
                                <div className="eight wide field">
                                    Bank Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="bankName" type="text" component={this.renderInput} placeholder="Bank Name" />
                                </div>
                                <div className="eight wide field">
                                    Account Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="accountName" type="text" component={this.renderInput} placeholder="Account Name" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="eight wide field">
                                    Account Number <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="accountNumber" type="number" component={this.renderInput} placeholder="Account Number" />
                                </div>
                                <div className="eight wide field">
                                    Branch <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="branch" type="text" component={this.renderInput} placeholder="Branch" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="eight wide field">
                                    Account Type <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="accountType" component={this.renderSelectField} type="text" >
                                        <option>-Select Account Type-</option>
                                        <option>Savings Account</option>
                                        <option>Current Account</option>
                                        <option>Fixed Account</option>
                                    </Field>
                                </div>
                                <div className="eight wide field">
                                    Currency <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="currency" component={this.renderSelectField} type="text" >
                                        <option>-Select Currency-</option>
                                        <option>LKR</option>
                                        <option>USD</option>
                                        <option>INR</option>
                                        <option>CNY</option>
                                        <option>EUR</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="four wide field">
                                    Account Status <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="accountStatus" component={this.renderSelectField} type="text" >
                                        <option>-Select Status-</option>
                                        <option>Active</option>
                                        <option>Deactive</option>
                                    </Field>
                                </div>
                                <div className="twelve wide field">
                                    Profit Center (Optional)
                                    <Field name="profitCenter" type="text" component={this.renderInput} placeholder=" Profit Center" />
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/bank-accounts-dashboard"} className="ui button">Back</Link>
                                <button type="submit" className="ui primary button">Submit</button>
                            </div>
                        </form>
                        {this.renderSuccessMessage()}
                    </div>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.bankName) {
        errors.bankName = 'Required!';
    }
    if (!formValues.accountName) {
        errors.accountName = 'Required!';
    }
    if (!formValues.accountNumber) {
        errors.accountNumber = 'Required!';
    }
    if (!formValues.branch) {
        errors.branch = 'Required!';
    }
    if (!formValues.accountType) {
        errors.accountType = 'Required!';
    }
    if (!formValues.currency) {
        errors.currency = 'Required!';
    }
    if (!formValues.accountStatus) {
        errors.accountStatus = 'Required!';
    }
    return errors;
}
const mapStateToProps = (state, ownPorps) => {
    const bankAccountMaster = state.bankAccountMaster[ownPorps.match.params.id]
    const bankAccountMasterState = Object.values(state.bankAccountMaster)
    return { bankAccountMaster: bankAccountMaster, initialValues: bankAccountMaster, bankAccountMasterState: bankAccountMasterState };
}
const formWrapped = reduxForm({
    form: 'editBankAccount',
    validate: validate
})(EditBankAccount);
export default connect(mapStateToProps, { fetchBankAccount, editBankAccount })(formWrapped);