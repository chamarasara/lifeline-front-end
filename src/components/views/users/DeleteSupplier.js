import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchSupplier, deleteSupplier } from "../../../actions";

class DeleteSupplier extends React.Component {

    componentDidMount() {
        console.log(this.props)
        this.props.fetchSupplier(this.props.match.params.id);
    }
    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteSupplier(id)} className="ui red button">Delete</button>
                <Link to={`/supplier-profile/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.supplier) {
            return 'Are you sure about deleting this Supplier ? '
        }
        return `Are you sure about deleting this Supplier ${this.props.supplier.supplierName}?`
    }
    render() {
        return (
            <Modal header="Delete Supplier" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/supplier-profile/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(ownPorps)
    return { supplier: state.supplier[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchSupplier, deleteSupplier })(DeleteSupplier);