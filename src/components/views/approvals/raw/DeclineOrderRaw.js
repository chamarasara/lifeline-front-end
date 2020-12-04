import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchPurchaseOrderRaw, updatePurchaseOrderRaw } from "../../../../actions";

class DeclineOrderRaw extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params._id)
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id);
    }
    renderActions() {
        const formValues = {}
        const order_state = "Declined"
        return (
            <React.Fragment>
                <button onClick={() => this.props.updatePurchaseOrderRaw(this.props.order._id, { ...formValues, order_state})} className="ui red button">Decline</button>
                <Link to={`/approvals-single-raw/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.order) {
            return `Are you sure about rejecting this order ? `
        }
        return `Are you sure about deleting this this order  ${this.props.order.orderNumber}?`
    }
    render() {
        return (
            <Modal header="Decline Order" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/approvals-single-raw/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { order: state.purchaseOrdersRaw[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchPurchaseOrderRaw, updatePurchaseOrderRaw })(DeclineOrderRaw);