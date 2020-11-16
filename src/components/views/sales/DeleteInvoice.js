import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { fetchInvoice, editInvoice } from "../../../actions";

class DeleteInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchInvoice(this.props.match.params.id);
    }
    onClick = () => {
        const formValues={
            invoice_state:"disabled"
        }
        this.props.editInvoice(this.props.invoice._id, formValues)
    }
    renderActions() {
        if (!this.props.invoice) {
            return (
                <div>
                    <p>Loading......</p>
                </div>
            )
        }
        
        console.log(this.props.invoice._id)
        return (
            <React.Fragment>
                <button onClick={this.onClick} className="ui red button">Disable</button>
                <Link to={`/edit-invoice/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.material) {
            return `Are you sure about disabling this Invoice ? `
        }
        return `Are you sure about disabling this Invoice?`
    }
    render() {
        return (
            <Modal header="Disable Invoice" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/edit-invoice/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { invoice: state.invoices[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchInvoice, editInvoice })(DeleteInvoice);