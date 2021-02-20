import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { deleteDistributor, fetchDistributor } from "../../../../actions";

class DeleteDistributor extends React.Component {

    componentDidMount() {
        this.props.fetchDistributor(this.props.match.params.id);
    }
    renderActions() {       
        
        if (!this.props.distributor) {
            return (
                <div className="ui active inline loader"></div>
            )
        }       
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteDistributor(this.props.distributor._id)} className="ui red button">Delete</button>
                <Link to={`/distributor-profile/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.distributor) {
            return 'Are you sure about deleting this Distributor ? '
        }
        return `Are you sure about deleting this Distributor ${this.props.distributor.distributorName} ?`
    }
    render() {
        return (
            <Modal header="Delete Distributor" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/distributor-profile/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(state.distributor[ownPorps.match.params.id])
    return { distributor: state.distributor[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { deleteDistributor, fetchDistributor })(DeleteDistributor);