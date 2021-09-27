import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { searchPurchaseOrdersRaw, fetchSupplier } from "../../../actions"

class PurchaseOrderRawSearchResults extends React.Component {
    componentDidMount() {
        this.props.searchPurchaseOrdersRaw()

    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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
            const date2 = moment(date).format('DD/MM/YYYY, h:mm: A')
            if (order.order_state === "Pending") {
                return (
                    <tr key={order.id} className="negative">
                        <td>
                            {date2}
                        </td>
                        <td>
                            {order.orderNumber}
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
                        <td style={{ "textAlign": "right" }}>
                            {
                                order.rawMaterials.map(unitPrice => {
                                    const price = Number(unitPrice.unitPrice)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(price.toFixed(2))}</p>
                                    )
                                }
                                )
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                order.rawMaterials.map(unitPrice => {
                                    const price = Number(unitPrice.unitPrice) * Number(unitPrice.quantity)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(price.toFixed(2))}</p>
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
            if (order.order_state === "Approved") {
                return (
                    <tr key={order.id} className="">
                        <td>
                            {date2}<br />
                        </td>
                        <td>
                            {order.orderNumber}
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
                        <td style={{ "textAlign": "right" }}>
                            {
                                order.rawMaterials.map(unitPrice => {
                                    const price = Number(unitPrice.unitPrice)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(price.toFixed(2))}</p>
                                    )
                                }
                                )
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                order.rawMaterials.map(unitPrice => {
                                    const price = Number(unitPrice.unitPrice) * Number(unitPrice.quantity)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(price.toFixed(2))}</p>
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
                    <table className="ui small blue striped celled table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Order No</th>
                                <th>Company Name</th>                            
                                <th>Raw Materials</th>
                                <th>Quantities</th>
                                <th>Unit Price</th>
                                <th>Total</th>
                                <th></th>
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
    return { orders: orders.reverse() };
}
export default connect(mapToSatate, { searchPurchaseOrdersRaw, fetchSupplier })(PurchaseOrderRawSearchResults);