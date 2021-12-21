import React from 'react';
import { Tab } from 'semantic-ui-react'
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import NewDispatchNote from "./dispatchNotes/NewDispatchNote";
import NewBankPaymentFormInvoice from "./invoicePayments/NewBankPaymentFormInvoice";
import NewCashPaymentFormInvoice from "./invoicePayments/NewCashPaymentFormInvoice";
import { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, fetchReturnInvoice, printDispatchNote } from '../../../actions';

class EditInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchInvoice(this.props.match.params.id)
        this.props.fetchReturnInvoice(this.props.match.params.id)
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
        let rates = this.props.invoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]
            totalValue[i] = (quantity * rate) / 100 * (100 - discount);

        }
        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    getDiscountValue() {
        let quantities = this.props.invoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.invoice.products.map(product => {
            return product.discount
        })

        let rates = this.props.invoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]

            totalValue[i] = (quantity * rate) / 100 * (discount);


        }

        return totalValue.map(value => {
            return (
                <p key={Math.random()}>{this.formatNumber(value.toFixed(2))}</p>
            )
        })
    }
    getReturnsTotal() {
        let quantities = this.props.returnInvoice.products.map(product => {
            return product.quantity

        })
        let discounts = this.props.returnInvoice.products.map(product => {
            return product.discount
        })

        let rates = this.props.returnInvoice.products.map(rate => {
            return rate.sellingPrice
        })
        let totalValue = []

        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let discount = discounts[i]
            let rate = rates[i]

            totalValue[i] = (quantity * rate) / 100 * (100 - discount);


        }
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
        if (!this.props.invoice.products) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        let quantities = this.props.invoice.products.map(product => {
            return product
        })
        let rates = this.props.invoice.products.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
            console.log(totalValue.reduce((a, b) => a + b, 0))
            //return totalValue
        }

        return totalValue.reduce((a, b) => a + b, 0)
    }
    getAdditionalChargesTotal() {
        const array = []
        if (!this.props.invoice.additionalCharges) {
            return 0
        }
        const totalArray = this.props.invoice.additionalCharges.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            console.log(amount)
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        console.log(sumOfArray)
        return sumOfArray

    }
    getSubTotalWithTransportCost() {
        if (!this.props.invoice.products) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        let quantities = this.props.invoice.products.map(product => {
            return product
        })
        let rates = this.props.invoice.products.map(rate => {
            return rate
        })
        let totalValue = []
        for (let i = 0; i < Math.min(quantities.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice) / 100 * (100 - quantity.discount);
        }
        const total = totalValue.reduce((a, b) => a + b, 0)
        const subtotal = total + this.getAdditionalChargesTotal()
        return this.formatNumber(subtotal.toFixed(2))
    }
    getReturnsSubTotal() {
        if (!this.props.returnInvoice) {
            return (0)
        }
        let quantities = this.props.returnInvoice.products.map(product => {
            return product
        })
        let rates = this.props.returnInvoice.products.map(rate => {
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

    renderInvoiceDetails() {
        return (
            <tr>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>FG{product.productCode}</p>
                        )
                    })
                    }
                </td>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>{product.productName}</p>
                        )
                    })
                    }
                </td>
                <td>
                    {this.props.invoice.productsDetails.map(product => {
                        return (
                            <p key={Math.random()}>{product.baseUnitMeasure}</p>
                        )
                    })
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(quantity => {
                            //console.log(quantity)
                            return (
                                <p key={Math.random()}>{quantity.quantity}</p>
                            )
                        }
                        )
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {
                        this.props.invoice.products.map(rate => {
                            //console.log(rate)
                            return (
                                <p key={Math.random()}>{rate.sellingPrice}</p>
                            )
                        }
                        )
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
                    {this.getDiscountValue()}
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
    renderDispatchTables() {
        if (!this.props.invoice.dispatchNotes) {
            return (
                <div>
                    <p style={{ textAlign: "center" }}>No Dispatch Notes Found</p>
                </div>
            )
        }
        return this.props.invoice.dispatchNotes.map(dispatchNote => {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="4">
                                <tr><h4 style={{ color: "red" }}>Dispatch Note</h4></tr>
                                <tr><p>Date-{moment(dispatchNote.date).format('DD MM YYYY, h:mm A')}</p></tr>
                                <tr><p>Remarks-{dispatchNote.remarks}</p></tr>
                            </th>
                        </tr>
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th style={{ textAlign: "right" }}>Quantity</th>
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
                            <td style={{ textAlign: "right" }}>
                                {
                                    dispatchNote.data.map(data => {
                                        return (
                                            <p key={Math.random()}>{data.quantity}</p>
                                        )
                                    }
                                    )

                                }
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr colSpan="12">
                            <th colSpan="7" style={{ textAlign: "right" }}><button type="button" onClick={() => this.printDispatchNote(dispatchNote.dispatchId)} className="ui primary button">Print</button></th>
                        </tr>
                    </tfoot>
                </table>
            )
        })

    }
    getTotalDispatchedQuantities() {
        const dispatchNotes = this.props.invoice.dispatchNotes
        const dataArray = dispatchNotes.map(data => {
            return data.data.map(data => {
                return data
            })
        })
        console.log(dataArray)
    }
    renderButtons() {
        if (!this.props.returnInvoice) {
            return (
                <div>
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/new-return-invoice/${this.props.match.params.id}`} type="button" className="ui primary button">Returns</Link>
                    <Link to={`/delete-invoice/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                    {this.getTotalDispatchedQuantities()}
                </div>
            )
        } else {
            return (
                <div>
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/delete-invoice/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        }
    }
    renderReturnInvoiceDetails() {
        if (!this.props.returnInvoice) {
            return (
                <div className="">
                    <p>No Returns Found</p>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
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
                                            return (
                                                <p key={Math.random()}>{quantity.quantity}</p>
                                            )
                                        }
                                        )
                                    }
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.returnInvoice.products.map(product => {
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
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClickReturnInvoice} className="ui primary button">Print</button>
                </div>
            </div>
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
                    <strong>Customer Reference: </strong>{this.props.invoice.reference}
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
                            <span key={customer.id}>{customer.email} </span>
                        )
                    })
                    }
                    <strong>Contact Number: </strong>{this.props.invoice.customer.map(customer => {
                        return (
                            <span key={customer.id}> {customer.mobileNo}</span>
                        )
                    })
                    }
                </p>

                <p className="item">

                </p>
                <p className="item">
                    <strong>Date: </strong>{moment(this.props.invoice.date).format('DD/MM/YYYY')} <strong>Created by :</strong> {this.props.invoice.userName}
                </p>
            </div>
        )

    }

    onSubmit = (formValues) => {
        this.props.editInvoice(this.props.invoice._id, formValues)
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
            return cash.cashPayments.map(amount => {
                var convAmount = parseInt(amount.cashAmount)
                return convAmount
            })
        })
        const sum = 0
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];
        }
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }

    totalPaidCheque() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let amount = this.props.invoice.paymentsAll.map(cash => {
            return cash.chequePayments.map(amount => {
                var convAmount = parseInt(amount.chequeAmount)
                return convAmount
            })
        })
        const sum = 0
        for (let i = 0; i < amount.length; i++) {
            sum += amount[i];
        }
        return (
            <span key={Math.random()}>{this.formatNumber(amount.reduce((a, b) => a + b, 0))}</span>
        )
    }

    renderAdditionalCharges() {
        if (!this.props.invoice.additionalCharges) {
            return (
                <tr colSpan="9">
                    <th colSpan="8" style={{ textAlign: "left" }}><span style={{ color: "#2185d0" }}>(+)</span> Additional Charges</th>
                    <th colSpan="1" style={{ textAlign: "right" }}>0.00</th>
                </tr>
            )
        }
        return this.props.invoice.additionalCharges.map(data => {
            console.log(data)
            let amount = Number(data.amount)
            return (
                <tr colSpan="9">
                    <th colSpan="8" style={{ textAlign: "right" }}><span style={{ color: "#2185d0" }}>(+)</span> {data.reason}</th>
                    <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</th>
                </tr>
            )
        })
    }
    rederPaymentsFormTab() {
        if (!this.props.invoice) {
            return (
                <div style={{ paddingTop: "0px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Loading
                            </div>
                            <p>Please be patient!</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ paddingTop: "15px" }}>
                    <div className="ui placeholder segment">
                        <div className="ui two column stackable center aligned grid">
                            <div className="ui vertical divider">Or</div>
                            <div className="row">
                                <div className="column">
                                    <NewBankPaymentFormInvoice data={this.props.invoice} msgBank={this.props.sucessMessege} />
                                </div>
                                <div className="column">
                                    <NewCashPaymentFormInvoice data={this.props.invoice} msgCash={this.props.sucessMessege} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.renderSuccessMessage()}
                    </div>
                </div>
            )
        }
    }
    renderSuccessMessage() {
        if (this.props.sucessMessege === 200) {
            return (
                <div style={{ paddingBottom: "30px" }}>
                    <div className="ui success message">
                        <div className="header" style={{ textAlign: "center" }}>Successfull !</div>
                    </div>
                </div>

            )
        }
    }
    renderBankPaymentsDetails() {
        console.log(this.props.invoice.bankPaymentsDetails)
        if (!this.props.invoice.bankPaymentsDetails) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.invoice.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.bankAccounts.map(bank => {
                            return (
                                <p key={bank.id}>{bank.bankName}-{bank.branch}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.chequeNumber}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.chequeDate).format('DD/MM/YYYY')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.bankPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.bankPaymentsDetails.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }
    getBankPaymentsTotal() {
        if (!this.props.invoice.bankPaymentsDetails) {
            return 0
        }
        const array = []
        const totalArray = this.props.invoice.bankPaymentsDetails.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return sumOfArray
    }
    renderBankPaymentsTable() {
        if (!this.props.invoice.bankPaymentsDetails) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cheque payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cheque Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Bank Name</th>
                            <th>Cheque Number</th>
                            <th>Cheque Date</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderBankPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="6">
                            <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(this.getBankPaymentsTotal().toFixed(2))}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    renderCashPaymentsDetails() {
        if (!this.props.invoice.cashPaymentsDetails) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <tbody>
                <tr>
                    <td>
                        {this.props.invoice.cashPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{moment(payment.date).format('DD/MM/YYYY, h:mm a')}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.cashPaymentsDetails.map(payment => {
                            return (
                                <p key={payment.id}>{payment.remarks}</p>
                            )
                        })
                        }
                    </td>
                    <td>
                        {this.props.invoice.cashPaymentsDetails.map(payment => {
                            let amount = Number(payment.amount)
                            return (
                                <p key={payment.id} style={{ textAlign: "right" }}>{this.formatNumber(amount.toFixed(2))}</p>
                            )
                        })
                        }
                    </td>
                </tr>
            </tbody>
        )

    }
    getCashPaymentsTotal() {
        const array = []
        const totalArray = this.props.invoice.cashPaymentsDetails.map(data => {
            let amount = Number(data.amount)
            for (let i = 0; i < array.length; i++) {
                array[i] = amount
            }
            return amount
        })
        const sumOfArray = totalArray.reduce((partial_sum, a) => partial_sum + a, 0)
        return sumOfArray
    }
    renderCashPaymentsTable() {
        if (!this.props.invoice.cashPaymentsDetails) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cash payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Cash Payments Details</h4></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    {this.renderCashPaymentsDetails()}
                    <tfoot>
                        <tr colSpan="3">
                            <th colSpan="2" style={{ textAlign: "right" }}>Subtotal</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(this.getCashPaymentsTotal().toFixed(2))}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    getTotalPayableAmount() {
        const invoiceAmount = Number(this.getSubTotal())
        const totalCheques = this.getBankPaymentsTotal()
        const totalCash = this.getCashPaymentsTotal()
        const totalPayable = invoiceAmount - (totalCheques + totalCash)
        return totalPayable
    }
    renderTotalTable() {
        if (!this.props.invoice) {
            return (
                <div style={{ paddingTop: "20px" }}>
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Sorry
                            </div>
                            <p>No any cash payments found!.</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>Payments Summary</h4></th>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <th style={{ textAlign: "right" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Invoice amount
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {this.formatNumber(this.getSubTotal().toFixed(2))}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                (-) Total cheques payments
                            </td>
                            <td style={{ textAlign: "right" }}>
                                ( {this.formatNumber(this.getBankPaymentsTotal().toFixed(2))} )
                            </td>
                        </tr>
                        <tr>
                            <td>
                                (-) Total cash payments
                            </td>
                            <td style={{ textAlign: "right" }}>
                                ( {this.formatNumber(this.getCashPaymentsTotal().toFixed(2))} )
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr colSpan="2">
                            <th colSpan="1" style={{ textAlign: "right" }}>Total payable</th>
                            <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(this.getTotalPayableAmount().toFixed(2))}</th>
                        </tr>
                    </tfoot>
                </table>
            )
        }
    }
    onClick = () => {
        this.props.printInvoice(this.props.invoice.id)
    }
    onClickReturnInvoice = () => {
        this.props.printReturnInvoice(this.props.returnInvoice.id)
    }
    printDispatchNote = (dispatchId) => {
        this.props.printDispatchNote(this.props.invoice.id, dispatchId)
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

        const panes = [
            {
                menuItem: 'Invoice Details', render: () => <Tab.Pane attached={false}>
                    <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
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
                                <th style={{ textAlign: "right" }}>Discount (%)</th>
                                <th style={{ textAlign: "right" }}>Discount Amount</th>
                                <th style={{ textAlign: "right" }}>Currency</th>
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInvoiceDetails()}
                        </tbody>
                        <tfoot>
                            <tr colSpan="9">
                                <th colSpan="8" style={{ textAlign: "right" }}></th>
                                <th colSpan="1" style={{ textAlign: "right" }}>{this.formatNumber(this.getSubTotal().toFixed(2))}</th>
                            </tr>
                            {this.renderAdditionalCharges()}
                            <tr colSpan="9">
                                <th colSpan="8" style={{ textAlign: "right" }}>Subtotal:</th>
                                <th colSpan="1" style={{ textAlign: "right" }}>{this.getSubTotalWithTransportCost()}</th>
                            </tr>
                        </tfoot>
                    </table>
                </Tab.Pane>
            },
            {
                menuItem: 'Returns Details', render: () =>
                    <Tab.Pane attached={false}>
                        {this.renderReturnInvoiceDetails()}
                    </Tab.Pane>
            },
            {
                menuItem: 'Dispatch Details', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <NewDispatchNote data={this.props.invoice} />
                            <div style={{ paddingTop: "50px" }}>
                                {this.renderDispatchTables()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'Payments Details', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <div>
                                {this.renderTotalTable()}
                            </div>
                            <div>
                                {this.rederPaymentsFormTab()}
                            </div>
                            <div>
                                {this.renderBankPaymentsTable()}
                            </div>
                            <div>
                                {this.renderCashPaymentsTable()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h4><span style={{ color: "#2185d0" }}>Invoice #{this.props.invoice.invoiceNumber}</span></h4>
                        {this.renderCustomerDetails()}
                    </div>
                    <Tab style={{ paddingBottom: "20px" }} menu={{ pointing: true }} panes={panes} />
                    <div>
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const invoice = state.invoices[ownProps.match.params.id]
    const returnInvoice = state.returnInvoices[ownProps.match.params.id]
    const sucessMessege = state.invoices.undefined
    console.log(sucessMessege)
    return {
        errorMessage: state,
        customers: customers,
        invoice: invoice,
        sucessMessege: sucessMessege,
        initialValues: invoice,
        returnInvoice
    };
}
const formWrapped = reduxForm({
    form: 'invoicePayments'
})(EditInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice, printReturnInvoice, printDispatchNote, fetchReturnInvoice })(formWrapped);