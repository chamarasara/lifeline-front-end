import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { fetchSuppliers } from "../../../actions"
class InvoiceList extends React.Component {
    // componentDidMount() {
    //     this.props.fetchSuppliers()
    // }

    // renderList() {
    //     return this.props.supplier.map(supplier => {
    //         return (

    //         )
    //     })
    // }
    render() {
        return (
            <div >
                <div >
                    <h4>All Invoices</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Product Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>UOM</th>
                                <th>Rate</th>
                                <th>Currency</th>
                                <th>Total</th>
                            </tr></thead>
                        <tbody>
                            <tr key={1}>
                                <td>
                                    123
                                </td>
                                <td>
                                    Moringa
                                </td>
                                <td>
                                    100
                                </td>
                                <td>
                                    Pcs
                                </td>
                                <td>
                                    1200.00
                                </td>
                                <td>
                                    LKR
                                </td>
                                <td>
                                    12000.00
                                </td>
                                <td>
                                    <Link to={`/supplier-profile/${10}`} className="ui blue button">View</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
// const mapToSatate = (state) => {
//     console.log(state)
//     const supplier = Object.values(state.supplier)
//     return { supplier: supplier };
// }
export default connect(null, {})(InvoiceList);