import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchPurchaseOrderRaw, updatePurchaseOrderRaw } from "../../../actions";

class DeletePurchaseOrderRaw extends React.Component {

    componentDidMount() {       
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id);
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
    }   
    onSubmit = (formValues) => {
        const order_state = "disabled";
        this.props.updatePurchaseOrderRaw(this.props.order._id, { ...formValues, order_state })
    }
    renderActions() {
       if (!this.props.order) {
           return(
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
                        <Link to={`/single-purchase-order-raw/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
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
            <Modal header="Disable Purchase Order" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-purchase-order-raw/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { order: state.purchaseOrdersRaw[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'disableOrderRaw'
})(DeletePurchaseOrderRaw);
export default connect(mapToSatate, { fetchPurchaseOrderRaw, updatePurchaseOrderRaw })(formWrapped);