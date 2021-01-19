import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice } from '../../../actions';

class EditInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchProductsMaster()
        this.props.fetchInvoice(this.props.match.params.id)
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
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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

        return (
            <span key={Math.random()}>{this.formatNumber(totalValue.reduce((a, b) => a + b, 0).toFixed(2))}</span>
        )
    }
    renderInvoiceDetails() {
        return (
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
        )

    }
    renderCustomerDetails() {
        return (
            <div>
                <p>
                    <strong>Quotation Number:</strong>{this.props.invoice.quotation.map(quotation => {
                        return (
                            <span key={quotation.id}>{quotation.quotationNumber}</span>
                        )
                    })}
                </p>
                <p>
                    <strong>Company Name:</strong>{this.props.invoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.companyName}</span>
                        )
                    })
                    }
                </p>
                <p>
                    <strong>Remarks:</strong>{this.props.invoice.remarks}
                </p>
                <p>
                    <strong>Address:</strong> {this.props.invoice.customer.map(customer => {
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
                    <strong>Email: </strong>{this.props.invoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.email}</span>
                        )
                    })
                    }
                </p>
                <p>
                    <strong>Contact Number: </strong>{this.props.invoice.customer.map(customer => {
                        return (
                            <span key={customer.id}>{customer.mobileNo}</span>
                        )
                    })
                    }
                </p>
                <p><strong>Date: </strong>{moment(this.props.invoice.date).format('DD/MM/YYYY')}

                </p>
            </div>
        )

    }
    renderCashPaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((cashPayments, index) => <li key={index}>
                        <label htmlFor={cashPayments}>Cash Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="five wide field">
                                <Field name={`${cashPayments}.cashAmount`} type="number" required component="input" placeholder="Cash Amount" >
                                </Field>
                            </div>
                            <div className="five wide field">
                                <Field name={`${cashPayments}.remarks`} type="text" required component="input" placeholder="Remarks" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <button className="mini ui red button" type="button" onClick={() => window.location.reload()}>Cancel</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Cash Payment</button>
            </div>
        )
    }
    renderChequePaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((chequePayments, index) => <li key={index}>
                        <label htmlFor={chequePayments}>Cheque Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="six wide field">
                                <Field name={`${chequePayments}.chequeAmount`} type="number" required component="input" placeholder="Cheque Amount" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${chequePayments}.chequeNumber`} type="text" required component="input" placeholder="Cheque Number" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${chequePayments}.bankName`} type="text" required component="input" placeholder="Bank Name" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${chequePayments}.chequeDate`} type="date" required component="input" placeholder="Cheque Date" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <button className="mini ui red button" type="button" onClick={() => window.location.reload()}>Cancel</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Cheque Payment</button>
                    </li>
                </ul>

            </div>
        )
    }
    renderPaymentsFields = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((payments, index) => <li key={index}>
                        <label htmlFor={payments}>Payment #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <FieldArray name={`${payments}.cashPayments`} component={this.renderCashPaymentsFields} />
                            </div>
                            <div className="ten wide field">
                                <FieldArray name={`${payments}.chequePayments`} component={this.renderChequePaymentsFields} />
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Payment</button>
            </div>
        )
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.editInvoice(this.props.invoice._id, formValues)
    }
    renderPaymentsForm = () => {
        return (
            <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="fields">
                    <div className="sixteen wide field">
                        <label>Pay- </label>
                        <FieldArray name="paymentsAll" component={this.renderPaymentsFields} />
                    </div>
                </div>
                <div className="field">
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="submit" className="ui primary button">Submit</button>
                </div>
            </form>
        )
    }

    renderPaidCashAmount() {
        let totalCash = this.props.invoice.paymentsAll.map(cash => {
            if (!cash.cashPayments) {
                return (
                    <tr key={Math.random()}>
                        <td colSpan="3">
                            -
                        </td>
                        <td colSpan="1">
                            -
                        </td>
                    </tr>
                )
            }
            return cash.cashPayments.map(ca => {
                return (
                    <tr key={Math.random()}>
                        <td colSpan="3">
                            {ca.remarks}
                        </td>
                        <td colSpan="1">
                            {ca.cashAmount}
                        </td>
                    </tr>
                )
            })
        })
        return totalCash
    }
    totalPaidCash() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let amount = this.props.invoice.paymentsAll.map(cash => {
            console.log(cash.cashPayments)
            return cash.cashPayments.map(amount => {
                var convAmount =parseInt(amount.cashAmount)
                console.log(convAmount)
                console.log(typeof(convAmount))
                return convAmount
            })
        })    
        var sum = 0;   
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];            
        }
        console.log(sum)
        console.log(amount.reduce(reducer))
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }
    renderPaidBankAmount() {
        let totalCash = this.props.invoice.paymentsAll.map(cheque => {
            if (!cheque.chequePayments) {
                return (
                    <tr key={Math.random()}>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                        <td>
                            -
                        </td>
                    </tr>
                )
            }
            return cheque.chequePayments.map(ca => {
                return (
                    <tr key={Math.random()}>
                        <td>
                            {ca.bankName}
                        </td>
                        <td>
                            {ca.chequeNumber}
                        </td>
                        <td>
                            {ca.chequeDate}
                        </td>
                        <td>
                            {ca.chequeAmount}
                        </td>
                    </tr>
                )
            })
        })
        console.log(typeof (totalCash))
        console.log(totalCash)
        return totalCash
    }
    totalPaidCheque() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let amount = this.props.invoice.paymentsAll.map(cash => {
            console.log(cash)
            return cash.chequePayments.map(amount => {
                var convAmount = parseInt(amount.chequeAmount)
                console.log(convAmount)
                console.log(typeof (convAmount))
                return convAmount
            })
        })
        var sum = 0;
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];
        }
        console.log(sum)
        console.log(amount.reduce(reducer))
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }
    renderPayments = () => {
        return (
            <div>
                <h4 style={{ paddingTop: "20px" }}>Payments: </h4>
                <p><b>Total value:</b> {this.getSubTotal()}</p>
               
                <div>
                    <table className="ui   structured celled table">
                        <thead>
                            <tr>
                                <th colSpan="4">Cheque Payments</th>
                            </tr>
                            <tr>
                                <th>Bank Name</th>
                                <th>Cheque Number</th>
                                <th>Cheque Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPaidBankAmount()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="ui  structured celled table">
                        <thead>
                            <tr>
                                <th colSpan="4">Cash Payments</th>
                            </tr>
                            <tr>
                                <th colSpan="3">Remarks</th>
                                <th colSpan="1">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPaidCashAmount()}
                        </tbody>
                    </table>
                </div>
                {this.renderPaymentsForm()}
            </div>
        )
    }

    onClick = () => {
        this.props.printInvoice(this.props.invoice.id)
    }

    render() {
        if (!this.props.invoice) {
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
                    <h3>Invoice #{this.props.invoice.invoiceNumber}</h3>
                    {this.renderCustomerDetails()}
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
                            {this.renderInvoiceDetails()}
                        </tbody>
                        <tfoot>
                            <tr colSpan="16">
                                <th colSpan="7" style={{ textAlign: "right" }}>Sub Total:</th>
                                <th colSpan="8" style={{ textAlign: "right" }}>{this.getSubTotal()}</th>
                            </tr>
                        </tfoot>
                    </table>
                    <div>
                        <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                        <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                        <Link to={`/delete-invoice/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                    </div>
                    {this.renderPayments()}
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.productMaster)
    const invoice = state.invoices[ownProps.match.params.id]
    console.log(invoice)
    return { errorMessage: state, customers: customers, products: products, invoice: invoice, initialValues: invoice };
}
const formWrapped = reduxForm({
    form: 'invoicePayments'
})(EditInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice })(formWrapped);