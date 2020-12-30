import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchQuotation, disableQuotation } from "../../../../actions";

class DeclineQuotation extends React.Component {

    componentDidMount() {
        this.props.fetchQuotation(this.props.match.params.id);
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
        const quotation_state = "Declined";
        this.props.disableQuotation(this.props.quotation._id, { ...formValues, quotation_state })
    }
    renderActions() {
        if (!this.props.quotation) {
            return (
                <div>
                    <p>Loading......</p>
                </div>
            )
        }
        console.log(this.props.quotation._id)
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
                        <Link to={`/approvals-single-quotation/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
                    </div>
                </form>

            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.order) {
            return `Are you sure about disabling this Quotation ? `
        }
        return `Are you sure about disabling this Quotation?`
    }
    render() {
        return (
            <Modal header="Disable Quotation" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/approvals-single-quotation/${this.props.match.params.id}`)} />
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
    return { quotation: state.quotations[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'disableQuotation',
    validate: validate
})(DeclineQuotation);
export default connect(mapToSatate, { fetchQuotation, disableQuotation })(formWrapped);