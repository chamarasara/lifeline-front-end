import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { searchPurchaseOrders, fetchCustomer } from "../../../actions"
class PurchaseOrderSearchResults extends React.Component {
    componentDidMount() {
        this.props.searchPurchaseOrders()

    }

    renderList() {
        if (!this.props.orders) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.orders.map(order => {
            const date = order.date;
            const date2 = moment(date).format('MM/DD/YYYY, h:mm: a')
            console.log(date2)
            return (
                <tr key={order.id}>
                    <td>
                        {date2}
                    </td>
                    <td>
                        {
                            order.searchSupplier.map(supplier1 => {
                                return (
                                    <span key={supplier1.id}>{supplier1.supplierName}</span>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            order.searchRawMaterial.map(material => {
                                console.log(material)
                                return (
                                    <p key={material.id}>{material.materialName}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            order.rawMaterials.map(quantity => {
                                return (
                                    <p key={Math.random()}>{quantity.quantity}</p>
                                )
                            }
                            )
                        }
                    </td>
                    <td>
                        {
                            order.searchPackingMaterial.map(material => {
                                console.log(material)
                                return (
                                    <p key={material.id}>{material.materialName}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            order.packingMaterials.map(quantity => {
                                return (
                                    <p key={Math.random()}>{quantity.quantity}</p>
                                )
                            }
                            )
                        }
                    </td>
                    <td>
                        <Link to={`/edit-purchase-order/${order.id}`} className="ui red button">Edit</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        if (this.props.orders.length <=0) {
            return (
                <div>
                    <p>No Purchase Orders found!</p>
                </div>
            )
        }
        return (
            <div >
                <div >
                    <h4>All Purchase Orders</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Supplier Name</th>
                                <th>Raw Materials</th>
                                <th>Quantities</th>
                                <th>Packing Materials</th>
                                <th>Quantities</th>
                            </tr>
                        </thead>
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
    console.log(Object.values(state.purchaseOrders))
    const orders = Object.values(state.searchPurchaseOrders)
    //delete orders['searchText']
    console.log(orders)
    return { orders: orders };
}
export default connect(mapToSatate, { searchPurchaseOrders, fetchCustomer })(PurchaseOrderSearchResults);