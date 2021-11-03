import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import moment from 'moment'
import { connect } from 'react-redux';
import { cashPaymentsPurchaseOrderRaw } from '../../../actions';

class NewCashPaymentFormRaw extends React.Component {

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
    renderSuccessMessage() {
        if (this.props.successMsg === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }

    onSubmit = (formValues) => {
        console.log("Form", formValues)
        this.props.cashPaymentsPurchaseOrderRaw(this.props.purchaseOrder._id, formValues)
    }
    render() {
        return (
            <div style={{ paddingLeft: "30px", paddingRight: "30px", paddingTop: "20px" }}>
                <div>
                    <h4>Cash Payment</h4>
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
    return errors;
}

const formWrapped = reduxForm({
    form: 'purchaseOrderCashPaymentsRaw',
    validate: validate
})(NewCashPaymentFormRaw);


const mapStateToProps = (state, ownPorps) => {
    const purchaseOrder = ownPorps.data
    const successMsg = ownPorps.msgCash
    console.log()
    return {
        errorMessage: state,
        purchaseOrder: purchaseOrder,
        successMsg: successMsg
    };
}

export default connect(mapStateToProps, { cashPaymentsPurchaseOrderRaw })(formWrapped);