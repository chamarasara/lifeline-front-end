import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchBom, deleteBom } from "../../../../actions";

class DeleteBom extends React.Component {

    componentDidMount() {
        this.props.fetchBom(this.props.match.params.id)
    }
    renderActions() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteBom(this.props.bom._id)} className="ui red button">Delete</button>
                <Link to={`/single-bom/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.bom) {
            return `Are you sure about deleting BOM ? `
        }
        return `Are you sure about deleting this BOM ?`
    }
    render() {
        return (
            <Modal header="Delete BOM" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-bom/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { bom: state.bom[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchBom, deleteBom })(DeleteBom);