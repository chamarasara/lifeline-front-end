import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchPurchaseOrderPacking, updatePurchaseOrderPacking } from "../../../../actions";

class DeclineOrderPacking extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id);
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
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
    onSubmit = (formValues) => {
        const order_state = "Declined";
        this.props.updatePurchaseOrderPacking(this.props.order._id, { ...formValues, order_state })
    }
    renderActions() {
        if (!this.props.order) {
            return (
                <div>
                    <p>Loading......</p>
                </div>
            )
        }
        console.log(this.props.order._id)
        return (
            <React.Fragment>
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="twelve wide field">
                            <label style={{ textAlign: "left" }}>Please enter the reason for disable this order</label>
                            <Field name="disable_reason" required component={this.renderInput} placeholder="Reason" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <button onClick={this.onClick} className="ui red button">Disable</button>
                        <Link to={`/approvals-single-packing/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
                    </div>
                </form>

            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.order) {
            return `Are you sure about disabling this Purchase Order ? `
        }
        return `Are you sure about disabling this Purchase Order?`
    }
    render() {
        return (
            <Modal header="Disable Purchase Order" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/approvals-single-packing/${this.props.match.params.id}`)} />
        );
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.disable_reason) {
        errors.disable_reason = 'Required!';
    }
    return errors;
}
const mapToSatate = (state, ownPorps) => {
    return { order: state.purchaseOrdersPacking[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'disableOrderPacking',
    validate: validate
})(DeclineOrderPacking);
export default connect(mapToSatate, { fetchPurchaseOrderPacking, updatePurchaseOrderPacking })(formWrapped);