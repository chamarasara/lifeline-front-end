import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { fetchBankAccount, deleteBankAccount } from "../../../../actions";

class DeleteBankAccount extends React.Component {

    componentDidMount() {
        this.props.fetchBankAccount(this.props.match.params.id)
    }
    renderActions() {
        let deleted = true
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteBankAccount(this.props.bankAccountMaster._id, deleted )} className="ui red button">Delete</button>
                <Link to={"/bank-accounts-dashboard"} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.bom) {
            return `Are you sure about deleting this account ? `
        }
        return `Are you sure about deleting this account ?`
    }
    render() {
        return (
            <Modal header="Delete Bank Account" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push("/bank-accounts-dashboard")} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    const bankAccountMaster = state.bankAccountMaster[ownPorps.match.params.id]
    return {
        bankAccountMaster: bankAccountMaster
    };
}
export default connect(mapToSatate, { fetchBankAccount, deleteBankAccount })(DeleteBankAccount);