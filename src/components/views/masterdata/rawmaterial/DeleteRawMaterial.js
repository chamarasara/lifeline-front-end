import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchRawMaterial, deleteRawMaterial } from "../../../../actions";

class DeleteRawMaterial extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params._id)
        this.props.fetchRawMaterial(this.props.match.params.id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteRawMaterial(this.props.material._id)} className="ui red button">Delete</button>
                <Link to={`/single-raw-material/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about deleting Raw Material ? `
        }
        return `Are you sure about deleting this Raw Material  ${this.props.material.materialName}?`
    }
    render() {
        return (
            <Modal header="Delete Raw Material" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-raw-material/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { material: state.rawMaterials[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchRawMaterial, deleteRawMaterial })(DeleteRawMaterial);