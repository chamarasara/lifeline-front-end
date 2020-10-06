import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { deleteCustomer, fetchCustomer } from "../../../actions";

class DeleteCustomer extends React.Component {

    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id);
    }
    renderActions() {
        const  id  = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteCustomer(id)} className="ui red button">Delete</button>
                <Link to={`/customer-profile/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.customer) {
            return 'Are you sure about deleting this Customer ? '
        }
        return `Are you sure about deleting this Customer ${this.props.customer.customerName }`
    }
    render() {
        return (
            <Modal header="Delete Customer" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/customer-profile/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(ownPorps)
    return { customer: state.customer[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { deleteCustomer, fetchCustomer })(DeleteCustomer);