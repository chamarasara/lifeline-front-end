import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchProductMaster, deleteProductMaster } from "../../../../actions";

class DeleteProductMaster extends React.Component {

    componentDidMount() {
        this.props.fetchProductMaster(this.props.match.params.id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteProductMaster(this.props.match.params.id)} className="ui red button">Delete</button>
                <Link to={`/single-product-master/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about deleting this Product ? `
        }
        return `Are you sure about deleting this Product  ${this.props.product.productName}?`
    }
    render() {
        return (
            <Modal header="Delete Product" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-product-master/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { product: state.productMaster[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchProductMaster, deleteProductMaster })(DeleteProductMaster);