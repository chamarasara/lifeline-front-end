import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { fetchSuppliers } from "../../../actions"
class PurchaseOrderList extends React.Component {
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
                    <h4>All Purchase Orders</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={1}>
                                <td>
                                    Unilever
                                </td>
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
export default connect(null, {})(PurchaseOrderList);