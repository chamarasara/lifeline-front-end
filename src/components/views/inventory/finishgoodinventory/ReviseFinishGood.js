import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchFinishGoodInventory, reviseFinishGoodInventory } from "../../../../actions";

class ReviseFinishGood extends React.Component {

    componentDidMount() {
        this.props.fetchFinishGoodInventory(this.props.match.params.id);
    }
    onSubmit = (formValues) => {
        const finishGoodState = "Revised";
        console.log(formValues)
        this.props.reviseFinishGoodInventory(this.props.finishGood._id, { ...formValues, finishGoodState})
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
        if (!this.props.finishGood) {
            return (
                <div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }

        console.log(this.props.finishGood._id)
        return (
            <React.Fragment>
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="twelve wide field">
                            <label style={{textAlign:"left"}}>Please enter the reason for revise this record !</label>
                            <Field name="reviseReason" required component={this.renderInput} placeholder="Reason" type="text" />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="ui red button">Revise</button>
                        <Link to={`/single-finish-good-inventory/${this.props.finishGood.id}`} className="ui cancel button">Cancel</Link>
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
        if (!this.props.finishGood) {
            return `Are you sure about revising this record ?`
        }
        return `Are you sure about revising this record ?`
    }
    render() {
        return (
            <Modal header="Revise Finish Good"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push(`/single-finish-good-inventory/${this.props.finishGood.id}`)}
            />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(state)
    return { finishGood: state.finishGoodInventory[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'reviseFinishGoodInventory'
})(ReviseFinishGood);
export default connect(mapToSatate, { fetchFinishGoodInventory, reviseFinishGoodInventory })(formWrapped);