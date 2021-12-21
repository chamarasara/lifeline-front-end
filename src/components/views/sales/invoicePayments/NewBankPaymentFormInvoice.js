import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import moment from 'moment'
import { connect } from 'react-redux';
import { fetchBankAccounts, bankPaymentsInvoice } from '../../../../actions';

class NewBankPaymentFormInvoice extends React.Component {
    componentDidMount() {
        this.props.fetchBankAccounts()
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
    // renderSuccessMessage() {
    //     console.log(this.props.successMsg)
    //     if (this.props.successMsg === 200) {
    //         return (
    //             <div className="ui success message">
    //                 <div className="header">Successfull !</div>
    //             </div>
    //         )
    //     }
    // }
    renderBankAccounts() {
        return this.props.bankAccountMaster.map(bank => {
            if (bank.accountStatus === "Active" && bank.deleted === "false") {
                return (
                    <option key={bank._id} value={bank.id}>{bank.bankName}-{bank.branch}</option>
                )
            }

        })
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.bankPaymentsInvoice(this.props.invoice._id, formValues)
    }
    render() {
        return (
            <div style={{ paddingLeft: "30px", paddingRight: "30px", paddingTop: "20px" }}>
                <div>
                    <h4>Cheque Payment</h4>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Amount
                                <Field name="amount" type="number" required component={this.renderInput} placeholder="Amount">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Cheque Number
                                <Field name="chequeNumber" type="text" required component={this.renderInput} placeholder="Cheque Number">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Cheque Date
                                <Field name="chequeDate" type="date" required component={this.renderInput} placeholder="Cheque Date">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Bank
                                <Field name="bank" type="text" required component={this.renderSelectField} >
                                    <option>-Select Bank Account-</option>
                                    {this.renderBankAccounts()}
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Remarks (Optional)
                                <Field name="remarks" type="text" required component={this.renderInput} placeholder="Remarks">
                                </Field>
                            </div>
                        </div>
                        <div className="field">
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
    if (!formValues.chequeNumber) {
        errors.chequeNumber = 'Required';
    }
    if (!formValues.chequeDate) {
        errors.chequeDate = 'Required';
    }
    if (!formValues.amount) {
        errors.amount = 'Required';
    }
    if (!formValues.bank) {
        errors.bank = 'Required';
    }
    if (!formValues.amount) {
        errors.amount = 'Required';
    }
    return errors;
}

const formWrapped = reduxForm({
    form: 'invoiceBankPayments',
    validate: validate
})(NewBankPaymentFormInvoice);


const mapStateToProps = (state, ownPorps) => {
    console.log(ownPorps.msg)
    const bankAccountMaster = Object.values(state.bankAccountMaster)
    const invoice = ownPorps.data
    console.log(invoice)
    const successMsg = ownPorps.msgBank

    return {
        errorMessage: state,
        bankAccountMaster: bankAccountMaster,
        invoice: invoice,
        successMsg: successMsg
    };
}

export default connect(mapStateToProps, { fetchBankAccounts, bankPaymentsInvoice })(formWrapped);