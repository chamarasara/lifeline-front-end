import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchQuotation, editQuotation } from "../../../../actions";

class DeleteQuotation extends React.Component {

    componentDidMount() {
        this.props.fetchQuotation(this.props.match.params.id);
    }
    onSubmit = (formValues) => {
        const quotation_state = "Disabled";
        this.props.editQuotation(this.props.quotation._id, { ...formValues, quotation_state})
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
                            <label style={{textAlign:"left"}}>Please enter the reason for disable this quotation</label>
                            <Field name="disable_reason" required component={this.renderInput} placeholder="Reason" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui red button">Disable</button>
                        <Link to={`/view-quotation/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
                    </div>
                </form>

            </React.Fragment>
        );
    }
    // onSubmit = (formValues) => {
    //     console.log(formValues)
    //     //formValues.userType.id = parseInt(formValues.userType.id)
    //     this.props.editQuotation(this.props.invoice._id, formValues)
    // }
    renderContent() {
        if (!this.props.invoice) {
            return `Are you sure about disabling this Quotation?`
        }
        return `Are you sure about disabling this Quotation?`
    }
    render() {
        return (
            <Modal header="Disable Quotation"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push(`/view-quotation/${this.props.match.params.id}`)}
            />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { quotation: state.quotations[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'disableQuotation'
})(DeleteQuotation);
export default connect(mapToSatate, { fetchQuotation, editQuotation })(formWrapped);