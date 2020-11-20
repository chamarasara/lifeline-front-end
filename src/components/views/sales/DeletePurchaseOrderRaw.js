import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchPurchaseOrderRaw, deletePurchaseOrderRaw } from "../../../actions";

class DeletePurchaseOrderRaw extends React.Component {

    componentDidMount() {       
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id);
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
                <button onClick={() => this.props.deletePurchaseOrderRaw(this.props.order._id)} className="ui red button">Delete</button>
                <Link to={`/single-purchase-order-raw/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
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
            <Modal header="Delete Purchase Order" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-purchase-order-raw/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { order: state.purchaseOrdersRaw[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchPurchaseOrderRaw, deletePurchaseOrderRaw })(DeletePurchaseOrderRaw);