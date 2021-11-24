import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { additionalChargesCashPaymentsPurchaseOrderPacking } from '../../../actions';

class NewAdditionalCashPaymentFormPacking extends React.Component {

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
    renderSuccessMessage() {
        if (this.props.successMsg[1] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    renderAdditionalChargesDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (

            <ul>
                {fields.map((additionalCharges, index) => <li key={index}>
                    <label htmlFor={additionalCharges}>Expense #{index + 1}</label>
                    <div className="fields">
                        <div className="four wide field">
                            <Field name={`${additionalCharges}.reason`} type="text" required component={this.renderSelectField} placeholder="Expense Name" >
                                <option>-Select Expnese-</option>
                                <option value="Transport">Transport</option>
                                <option value="Sea Freight">Sea Freight</option>
                                <option value="Air Freight">Air Freight</option>
                                <option value="Custom Duty">Custom Duty</option>
                                <option value="Documents Charges">Documents Charges</option>
                                <option value="Service Fee">Service Fee</option>
                                <option value="Other">Other</option>
                            </Field>
                        </div>
                        <div className="four wide field">
                            <Field name={`${additionalCharges}.amount`} type="number" required component={this.renderInput} placeholder="Amount" >
                            </Field>
                        </div>
                        <div className="four wide field">
                            <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                        </div>
                    </div>
                </li>)}
                <li>
                    <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Expense</button>
                    {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                </li>
            </ul>
        )
    }
    onSubmit = (formValues) => {
        this.props.additionalChargesCashPaymentsPurchaseOrderPacking(this.props.purchaseOrder._id, formValues)
    }
    render() {
        return (
            <div style={{ paddingLeft: "30px", paddingRight: "30px", paddingTop: "20px", paddingBottom:"20px" }}>
                <div>
                    <h4>Cash Payment</h4>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>                        
                        <div className="fields">
                            <div className="four wide field">
                                Expense Type <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="reason" type="text" required component={this.renderSelectField} placeholder="Expense Name" >
                                    <option>-Expnese Type-</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Sea Freight">Sea Freight</option>
                                    <option value="Air Freight">Air Freight</option>
                                    <option value="Custom Duty">Custom Duty</option>
                                    <option value="Documents Charges">Documents Charges</option>
                                    <option value="Service Fee">Service Fee</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Amount <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="amount" type="number" required component={this.renderInput} placeholder="Amount">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="eight wide field">
                                Remarks (Optional)
                                <Field name="remarks" type="text" required component={this.renderInput} placeholder="Remarks">
                                </Field>
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                    {this.renderSuccessMessage()}
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.amount) {
        errors.amount = 'Required';
    }
    if (!formValues.reason) {
        errors.reason = 'Required';
    }
    return errors;
}

const formWrapped = reduxForm({
    form: 'purchaseOrderAdditionalCashPaymentsPacking',
    validate: validate
})(NewAdditionalCashPaymentFormPacking);


const mapStateToProps = (state, ownPorps) => {
    const purchaseOrder = ownPorps.data
    const successMsg = ownPorps.msgCash
    return {
        errorMessage: state,
        purchaseOrder: purchaseOrder,
        successMsg: successMsg
    };
}

export default connect(mapStateToProps, { additionalChargesCashPaymentsPurchaseOrderPacking })(formWrapped);