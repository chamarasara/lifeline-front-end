import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBankAccounts } from '../../../../actions';

class BankAccountsList extends React.Component {
    componentDidMount() {
        this.props.fetchBankAccounts()
    }

    renderList() {
        return this.props.bankAccountMaster.map(bank => {
            if (bank.deleted === "false") {
                console.log(bank._id)
                if (bank.accountStatus==="Active") {
                    return (
                        <tr key={bank._id}>
                            <td>
                                {bank.bankName}
                            </td>
                            <td>
                                {bank.accountName}
                            </td>
                            <td>
                                {bank.accountNumber}
                            </td>
                            <td>
                                {bank.branch}
                            </td>
                            <td>
                                {bank.accountType}
                            </td>
                            <td>
                                {bank.currency}
                            </td>
                            <td>
                                {bank.accountStatus}
                            </td>
                            <td>
                                {bank.profitCenter}
                            </td>
                            <td>
                                <div className="ui mini buttons">
                                    <Link to={`/edit-bank-account/${bank._id}`} className="ui blue mini button">Edit</Link>
                                    <div className="or"></div>
                                    <span><Link to={`/delete-bank-account/${bank._id}`} className="ui red mini button">Delete</Link></span>
                                </div>
                            </td>
                        </tr>
                    )
                }else if (bank.accountStatus==="Deactive") {
                    return (
                        <tr key={bank._id} className="negative">
                            <td>
                                {bank.bankName}
                            </td>
                            <td>
                                {bank.accountName}
                            </td>
                            <td>
                                {bank.accountNumber}
                            </td>
                            <td>
                                {bank.branch}
                            </td>
                            <td>
                                {bank.accountType}
                            </td>
                            <td>
                                {bank.currency}
                            </td>
                            <td>
                                {bank.accountStatus}
                            </td>
                            <td>
                                {bank.profitCenter}
                            </td>
                            <td>
                                <div className="ui mini buttons">
                                    <Link to={`/edit-bank-account/${bank._id}`} className="ui blue mini button">Edit</Link>
                                    <div className="or"></div>
                                    <span><Link to={`/delete-bank-account/${bank._id}`} className="ui red mini button">Delete</Link></span>
                                </div>
                            </td>
                        </tr>
                    )
                }
                
            }
            
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingRight: "30px", paddingBottom: "20px" }}>
                        <h4 style={{ textAlign: "center" }}>All Bank Accounts</h4>
                        <table className="ui small blue striped celled table">
                            <thead>
                                <tr>
                                    <th>Bank Name </th>
                                    <th>Account Name</th>
                                    <th>Account Number</th>
                                    <th>Branch </th>
                                    <th>Account Type </th>
                                    <th>Currency  </th>
                                    <th>Account Status </th>
                                    <th>Profit Center </th>
                                </tr></thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {
    const bankAccountMaster = Object.values(state.bankAccountMaster)
    return { bankAccountMaster: bankAccountMaster };
}
export default connect(mapToSatate, { fetchBankAccounts })(BankAccountsList);