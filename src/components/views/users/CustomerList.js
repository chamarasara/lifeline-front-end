import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCustomers } from "../../../actions"
class CustomerList extends React.Component {
    componentDidMount() {
        this.props.fetchCustomers()
    }

    renderList() {
        return this.props.customers.map(customer => {
            return (
                <tr key={customer._id}>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                {customer.customerName}
                                <div className="sub header">{customer.companyName}
                                </div>
                            </div>
                        </h4></td>
                    <td>
                        {customer.mobileNo1}
                    </td>
                    <td>
                        {customer.mobileNo2}
                    </td>
                    <td>
                        {customer.fax}
                    </td>
                    <td>
                        {customer.email}
                    </td>                   
                    <td>
                        <Link to={`/customer-profile/${customer._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>All Customers</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Customer Name</th>
                                <th>Contact Number 1</th>
                                <th>Contact Number 2</th>
                                <th>Fax</th>
                                <th>Email</th>                                
                            </tr></thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {

    const customers = Object.values(state.customer)
    console.log(state)
    return { customers: customers };
}
export default connect(mapToSatate, { fetchCustomers })(CustomerList);