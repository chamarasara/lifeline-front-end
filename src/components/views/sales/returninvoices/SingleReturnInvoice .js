import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, fetchReturnInvoice } from '../../../../actions';

class SingleReturnInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchInvoice(this.props.match.params.id)
        this.props.fetchReturnInvoice(this.props.match.params.id)
        console.log(this.props.match.params.id)
    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderCustomers() {
        return this.props.customers.map(customer => {
            return (
                <option key={customer._id} value={customer.id}>{customer.customerName}</option>
            )
        })
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }


    getReturnsTotal() {
        let quantities = this.props.returnInvoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.returnInvoice.products.map(product => {
            return product.discount
        })
        console.log(discounts)
        console.log(quantities)
        let rates = this.props.returnInvoice.productsDetails.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []
        console.log(rates)
        for (let i = 0; i < Math.min(quantities.length, discounts.length, rates.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]
            console.log(discount)
            totalValue[i] = (quantity * rate) / 100 * (100 - discount);
            console.log(totalValue)
            //return totalValue
        }
        console.log(totalValue)
        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    getTotal() {
        let quantities = this.props.invoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.invoice.products.map(product => {
            return product.discount
        })
        console.log(discounts)
        console.log(quantities)
        let rates = this.props.invoice.productsDetails.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []
        console.log(rates)
        for (let i = 0; i < Math.min(quantities.length, discounts.length, rates.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]
            console.log(discount)
            totalValue[i] = (quantity * rate) / 100 * (100 - discount);
            console.log(totalValue)
            //return totalValue
        }
        console.log(totalValue)
        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    getSubTotal() {
        if (!this.props.invoice.productsDetails) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        let quantities = this.props.invoice.products.map(product => {
            return product
        })
        console.log(quantities)
        let rates = this.props.invoice.productsDetails.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length, rates.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
            console.log(totalValue.reduce((a, b) => a + b, 0))
            //return totalValue
        }

        return this.formatNumber(totalValue.reduce((a, b) => a + b, 0).toFixed(2))
    }
    getReturnsSubTotal() {
        if (!this.props.returnInvoice) {
            return (0)
        }
        let quantities = this.props.returnInvoice.products.map(product => {
            return product
        })
        let rates = this.props.returnInvoice.productsDetails.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length, rates.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
            //console.log(totalValue.reduce((a, b) => a + b, 0))
            //return totalValue
        }

        return this.formatNumber(totalValue.reduce((a, b) => a + b, 0).toFixed(2))
    }
    renderReturnInvoiceDetails() {
        console.log(this.props.returnInvoice)
        if (!this.props.returnInvoice) {
            return (
                <div className="pusher">

                </div>
            )
        }
        return (
            <div>
                <div>
                    <table className="ui celled small padded compact structured table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Return Invoice Details</h4></th>
                            </tr>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>UOM</th>
                                <th style={{ textAlign: "right" }}>Quantity</th>
                                <th style={{ textAlign: "right" }}>Rate</th>
                                <th style={{ textAlign: "right" }}>Discount</th>
                                <th style={{ textAlign: "right" }}>Currency</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>FG{product.productCode}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.productName}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.baseUnitMeasure}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(quantity => {
                                            console.log(quantity)
                                            return (
                                                <p key={Math.random()}>{quantity.quantity}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.returnInvoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.sellingPrice}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(discount => {
                                            return (
                                                <p key={Math.random()}>{discount.discount}%</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.returnInvoice.products.map(currency => {
                                            return (
                                                <p key={Math.random()}>{currency.currency}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.getReturnsTotal()}
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr colSpan="16">
                                <th colSpan="7" style={{ textAlign: "right" }}>Sub Total:</th>
                                <th colSpan="8" style={{ textAlign: "right" }}>{this.getReturnsSubTotal()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div style={{ paddingTop: "10px" }}>
                    <Link to={"/return-invoice-dashboard"} type="button" className="ui button">Back</Link>                    
                    <button type="button" onClick={this.onClickReturnInvoice} className="ui primary button">Print</button>
                </div>
            </div>
        )

    }
    renderInvoiceDetails() {
        console.log(this.props.invoice)
        if (!this.props.invoice) {
            return (
                <div className="pusher">

                </div>
            )
        }
        return (
            <div>
                <div>
                    <table className="ui celled small padded compact structured table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Invoice Details</h4></th>
                            </tr>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>UOM</th>
                                <th style={{ textAlign: "right" }}>Quantity</th>
                                <th style={{ textAlign: "right" }}>Rate</th>
                                <th style={{ textAlign: "right" }}>Discount</th>
                                <th style={{ textAlign: "right" }}>Currency</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {this.props.invoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>FG{product.productCode}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.invoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.productName}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td>
                                    {this.props.invoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.baseUnitMeasure}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.invoice.products.map(quantity => {
                                            console.log(quantity)
                                            return (
                                                <p key={Math.random()}>{quantity.quantity}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.invoice.productsDetails.map(product => {
                                        return (
                                            <p key={product.id}>{product.sellingPrice}</p>
                                        )
                                    })
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.invoice.products.map(discount => {
                                            return (
                                                <p key={Math.random()}>{discount.discount}%</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {
                                        this.props.invoice.products.map(currency => {
                                            return (
                                                <p key={Math.random()}>{currency.currency}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.getTotal()}
                                </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr colSpan="16">
                                <th colSpan="7" style={{ textAlign: "right" }}>Sub Total:</th>
                                <th colSpan="8" style={{ textAlign: "right" }}>{this.getSubTotal()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div style={{ paddingTop: "10px" }}>
                    <Link to={"/return-invoice-dashboard"} type="button" className="ui button">Back</Link>                    
                </div>
            </div>
        )

    }
    renderCustomerDetails() {
        return (
            <div>
                <p>
                    <strong>Invoice Number:</strong>{this.props.returnInvoice.invoiceNumber}
                </p>
                <p>
                    <strong>Company Name:</strong>{this.props.returnInvoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.companyName}</span>
                        )
                    })
                    }
                </p>
                <p>
                    <strong>Reason:</strong>{this.props.returnInvoice.reason}
                </p>
                <p>
                    <strong>Address:</strong> {this.props.returnInvoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>
                                {customer.communicationAddress.no},
                                {customer.communicationAddress.lane},
                                {customer.communicationAddress.city},
                                {customer.communicationAddress.country},
                                {customer.communicationAddress.postalCode}.
                            </span>
                        )
                    })
                    }
                </p>
                <p>
                    <strong>Email: </strong>{this.props.returnInvoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.email}</span>
                        )
                    })
                    }
                </p>
                <p>
                    <strong>Contact Number: </strong>{this.props.returnInvoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.mobileNo}</span>
                        )
                    })
                    }
                </p>
                <p><strong>Date: </strong>{moment(this.props.returnInvoice.date).format('DD/MM/YYYY')}
                </p>
            </div>
        )

    }

    onClickReturnInvoice = () => {
        this.props.printReturnInvoice(this.props.returnInvoice.id)
    }
    render() {
        if (!this.props.returnInvoice) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <h3>Return Invoice #{this.props.returnInvoice.returnInvoiceNumber}</h3>
                    {this.renderCustomerDetails()}
                    {this.renderReturnInvoiceDetails()}
                    {this.renderInvoiceDetails()}
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const invoice = state.invoices[ownProps.match.params.id]
    const returnInvoice = state.returnInvoices[ownProps.match.params.id]
    console.log(ownProps.match.params.id)
    return { errorMessage: state, customers: customers, invoice, returnInvoice };
}
const formWrapped = reduxForm({
    form: 'invoicePayments'
})(SingleReturnInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, fetchReturnInvoice })(formWrapped);