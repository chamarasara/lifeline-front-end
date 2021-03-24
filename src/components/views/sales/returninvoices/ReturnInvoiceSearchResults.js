import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchInvoices, fetchCustomer } from "../../../../actions"
class ReturnInvoiceSearchResults extends React.Component {
    componentDidMount() {
        //this.props.fetchInvoices()
    }
    renderList() {
        if (!this.props.invoices) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.invoices.map(invoice => {
            console.log(invoice)
            const date = invoice.date;
            const date2 = moment(date).format('DD / MM / YYYY, h:mm: a')

            return (
                <tr key={invoice.id}>
                    <td>
                        {invoice.returnInvoiceNumber}<br />
                        {date2}
                    </td>
                    <td>
                        {invoice.invoiceNumber}<br />
                    </td>
                    <td>
                        {
                            invoice.searchCustomer.map(customer1 => {
                                return (
                                    <span key={customer1.id}>{customer1.companyName}</span>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            invoice.searchProducts.map(product => {
                                return (
                                    <p key={product.id}>{product.productName}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={Math.random()}>{product.quantity}</p>
                                )

                            }
                            )
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.searchProducts.map(product => {
                                return (
                                    <p key={product.id}>{product.sellingPrice}</p>
                                )
                            })
                        }
                    </td>
                    <td style={{ "textAlign": "right" }}>
                        {
                            invoice.products.map(product => {
                                return (
                                    <p key={Math.random()}>{product.discount}%</p>
                                )

                            }
                            )
                        }
                    </td>
                    <td>
                        <Link to={`/single-return-invoice/${invoice.invoiceId}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )


        })
    }
    render() {
        if (this.props.invoices.length <= 0) {
            return (
                <div>
                    <p>No Return Invoices found!</p>
                </div>
            )
        }
        return (
            <div >
                <div >
                    <h4>All Return Invoices</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Return Invoice No</th>
                                <th>Invoice No</th>
                                <th>Company Name</th>
                                <th>Products</th>
                                <th>Quantities</th>
                                <th>Rate</th>
                                <th>Discount</th>
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
    const invoices = Object.values(state.searchReturnInvoices)
    console.log(invoices)
    return { invoices: invoices.reverse() };
}
export default connect(mapToSatate, { fetchInvoices, fetchCustomer })(ReturnInvoiceSearchResults);