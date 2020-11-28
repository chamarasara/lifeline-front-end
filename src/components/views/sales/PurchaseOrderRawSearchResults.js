import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { searchPurchaseOrdersRaw, fetchSupplier } from "../../../actions"

class PurchaseOrderRawSearchResults extends React.Component {
    componentDidMount() {
        this.props.searchPurchaseOrdersRaw()

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
            const date2 = moment(date).format('DD/MM/YYYY, h:mm: a')
            console.log(date2)
            if (order.order_state === "enabled") {
                return (
                    <tr key={order.id}>
                        <td>
                            {date2}
                        </td>
                        <td>
                            {
                                order.searchSupplier.map(supplier1 => {
                                    return (
                                        <span key={supplier1.id}>{supplier1.companyName}</span>
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
                            <Link to={`/single-purchase-order-raw/${order.id}`} className="ui red button">View</Link>
                        </td>
                    </tr>
                )
            }

        })
    }
    render() {
        if (this.props.orders.length <= 0) {
            return (
                <div>
                    <p>No Purchase Orders found!</p>
                </div>
            )
        }
        console.log(this.props.orders)
        return (
            <div >
                <div >
                    <h4>All Purchase Orders</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Company Name</th>
                                <th>Raw Materials</th>
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
    const orders = Object.values(state.searchPurchaseOrdersRaw)
    return { orders: orders };
}
export default connect(mapToSatate, { searchPurchaseOrdersRaw, fetchSupplier })(PurchaseOrderRawSearchResults);