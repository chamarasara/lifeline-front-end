import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchPurchaseOrderPacking, deletePurchaseOrderPacking } from "../../../actions";

class DeletePurchaseOrderPacking extends React.Component {

    componentDidMount() {       
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id);
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
                <button onClick={() => this.props.deletePurchaseOrder(this.props.order._id)} className="ui red button">Delete</button>
                <Link to={`/single-purchase-order-packing/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about deleting this Purchase Order ? `
        }
        return `Are you sure about deleting this Purchase Order?`
    }
    render() {
        return (
            <Modal header="Delete Purchase Order" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-purchase-order-packing/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { order: state.purchaseOrdersPacking[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchPurchaseOrderPacking, deletePurchaseOrderPacking })(DeletePurchaseOrderPacking);