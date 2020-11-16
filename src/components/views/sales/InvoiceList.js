import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchInvoices, fetchCustomer } from "../../../actions"
class InvoiceList extends React.Component {
    componentDidMount() {
        this.props.fetchInvoices()
    }

    // renderList() {
    //     return this.props.supplier.map(supplier => {
    //         return (

    //         )
    //     })
    // }
    // getCustomerDetails() {
    //     return this.props.invoices.map(invoice => {
    //         this.props.fetchCustomer(invoice.customerId)
    //         return (
    //             <div>
    //                 {}
    //             </div>
    //         )
    //     })
    // }
    // renderProducts() {
    //     return this.props.invoices.map(invoice => {
    //         return invoice.productsList.map(product => {
    //             console.log(product);
    //             return (
    //                 <td>
    //                     {product.productName}
    //                 </td>
    //             )
    //         }

    //         )

    //     })
    // }
    renderList() {
        if (!this.props.invoices) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.invoices.map(invoice => {
            const date = invoice.date;
            const date2 = moment(date).format('DD / MM / YYYY, h:mm: a')
            return (
                <tr key={invoice.id}>
                    <td>
                        {date2}
                    </td>
                    <td>
                        {
                            invoice.customer.map(customer1 => {
                                return (
                                    <span key={customer1.id}>{customer1.customerName}</span>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            invoice.productsList.map(product => {
                                return (
                                    <p key={product.id}>{product.productName}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.products.map(quantity => {
                                return (
                                    <p key={Math.random()}>{quantity.quantity}</p>
                                )
                            }
                            )
                        }
                    </td>
                    <td>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={product.id}>{product.uom}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={product.id}>{product.rate}</p>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={product.id}>{product.currency}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={product.id}>{product.rate * product.quantity} </p>
                                )
                            })
                        }
                    </td>
                    <td>
                        <Link to={`/edit-invoice/${invoice.id}`} className="ui red button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div >
                <div >
                    <h4>All Invoices</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Date</th>
                                <th>Customer Name</th>
                                <th>Products</th>
                                <th>Quantities</th>
                                <th>UOM</th>
                                <th>Rate</th>
                                <th>Currency</th>
                                <th>Total</th>
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
    const invoices = Object.values(state.invoices)
    return { invoices: invoices };
}
export default connect(mapToSatate, { fetchInvoices, fetchCustomer})(InvoiceList);