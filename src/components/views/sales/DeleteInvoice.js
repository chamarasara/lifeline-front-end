import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchInvoice, disableInvoice } from "../../../actions";

class DeleteInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchInvoice(this.props.match.params.id);
    }
    onSubmit = (formValues) => {
        const invoice_state = "disabled";
        this.props.disableInvoice(this.props.invoice._id,{...formValues, invoice_state})
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
    }
    renderActions() {
        if (!this.props.invoice) {
            return (
                <div>
                    <p>Loading......</p>
                </div>
            )
        }

        console.log(this.props.invoice._id)
        return (
            <React.Fragment>
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="twelve wide field">
                            <label style={{textAlign:"left"}}>Please enter the reason for disable this invoice</label>
                            <Field name="disable_reason" required component={this.renderInput} placeholder="Reason" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui red button">Disable</button>
                        <Link to={`/edit-invoice/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
                    </div>
                </form>

            </React.Fragment>
        );
    }
    // onSubmit = (formValues) => {
    //     console.log(formValues)
    //     //formValues.userType.id = parseInt(formValues.userType.id)
    //     this.props.disableInvoice(this.props.invoice._id, formValues)
    // }
    renderContent() {
        if (!this.props.invoice) {
            return `Are you sure about disabling this Invoice?`
        }
        return `Are you sure about disabling this Invoice?`
    }
    render() {
        return (
            <Modal header="Disable Invoice"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push(`/edit-invoice/${this.props.match.params.id}`)}
            />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { invoice: state.invoices[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'disableInvoice'
})(DeleteInvoice);
export default connect(mapToSatate, { fetchInvoice, disableInvoice })(formWrapped);