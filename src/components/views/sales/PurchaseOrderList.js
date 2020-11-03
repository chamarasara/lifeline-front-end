import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPurchaseOrders, fetchCustomer } from "../../../actions"
class PurchaseOrderList extends React.Component {
    componentDidMount() {
        this.props.fetchPurchaseOrders()

    }
    getCustomerDetails() {
        return this.props.orders.map(order => {
            this.props.fetchCustomer(order.customerId)
            return (
                <div>
                    {}
                </div>
            )
        })
    }
    renderProducts() {
        return this.props.orders.map(order => {
            return order.productsList.map(product => {
                console.log(product);
                return (
                    <td>
                        {product.productName}
                    </td>
                )
            }

            )

        })
    }
    renderList() {
        if (!this.props.orders) {
            return(
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.orders.map(order => {
            const date = order.date;
            const date2 = moment(date).format('DD / MM / YYYY, h:mm: a')
                return (
                    <tr key={order.id}>
                        <td>
                            {date2}
                        </td>
                        <td>
                            {
                                order.customer.map(customer1 => {
                                    return(
                                        <span key={customer1.id}>{customer1.customerName}</span>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                order.productsList.map(product => {
                                    console.log(product)
                                    return (
                                        <p key={product.id}>{product.productName}</p>
                                    )
                                })
                            }
                        </td>
                        <td style={{"textAlign":"right"}}>
                            {
                                order.products.map(quantity => {
                                    return (
                                        <p key={Math.random()}>{quantity.quantity}</p>
                                    )
                                }
                                )
                            }
                        </td>
                        <td>
                            <Link to={`/edit-purchase-order/${ order.id}`} className="ui red button">Edit</Link>
                        </td>
                    </tr>
                )
            })
    }
    render() {
        return (
            <div >
                <div >
                    <h4>All Purchase Orders</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Customer Name</th>
                                <th>Products</th>
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
    const orders = Object.values(state.purchaseOrders)
    return { orders: orders };
}
export default connect(mapToSatate, { fetchPurchaseOrders, fetchCustomer })(PurchaseOrderList);