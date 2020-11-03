import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchPackingMaterial, deletePackingMaterial } from "../../../../actions";

class DeletePackingMaterial extends React.Component {

    componentDidMount() {
        this.props.fetchPackingMaterial(this.props.match.params.id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deletePackingMaterial(this.props.match.params.id)} className="ui red button">Delete</button>
                <Link to={`/single-packing-material/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about deleting Packing Material ? `
        }
        return `Are you sure about deleting this Packing Material  ${this.props.material.materialName}?`
    }
    render() {
        return (
            <Modal header="Delete Packing Material" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-packing-material/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { material: state.packingMaterials[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchPackingMaterial, deletePackingMaterial })(DeletePackingMaterial);