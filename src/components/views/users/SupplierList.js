import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSuppliers } from "../../../actions"
class SupplierList extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
    }

    renderList() {
        return this.props.supplier.map(supplier => {
            return (
                <tr key={supplier._id}>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                {supplier.companyName}
                                <div className="sub header">{supplier.supplierName}
                                </div>
                            </div>
                        </h4></td>
                    <td>
                        {supplier.mobileNo1}
                    </td>
                    <td>
                        {supplier.mobileNo2}
                    </td>
                    <td>
                        {supplier.fax}
                    </td>
                    <td>
                        {supplier.email}
                    </td>                    
                    <td>
                        <Link to={`/supplier-profile/${supplier._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>All Suppliers</h4>
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
    console.log(state)
    const supplier = Object.values(state.supplier)
    return { supplier: supplier };
}
export default connect(mapToSatate, { fetchSuppliers })(SupplierList);