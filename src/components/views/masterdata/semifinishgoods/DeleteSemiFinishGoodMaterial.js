import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchSemiFinishGood, deleteSemiFinishGood } from "../../../../actions";

class DeleteFinishGoodMaterial extends React.Component {

    componentDidMount() {
        this.props.fetchSemiFinishGood(this.props.match.params.id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteSemiFinishGood(this.props.match.params.id)} className="ui red button">Delete</button>
                <Link to={`/single-semi-finish-good-material/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about deleting Semi Finish Good ? `
        }
        return `Are you sure about deleting this Semi Finish Good ${this.props.material.materialName}?`
    }
    render() {
        return (
            <Modal header="Delete Semi Finish Good" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-semi-finish-good-material/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { material: state.semiFinishGoods[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchSemiFinishGood, deleteSemiFinishGood })(DeleteFinishGoodMaterial);