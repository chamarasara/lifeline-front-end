import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchProductsMaster, fetchQuotation, printQuotation } from '../../../../actions';

class ViewQuotation extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchProductsMaster()
        this.props.fetchQuotation(this.props.match.params.id)
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


    getTotal() {
        let quantities = this.props.quotation.products.map(product => {
            return product
        })
        console.log(quantities)
        let rates = this.props.quotation.productsList.map(rate => {
            return rate
        })
        let totalValue=[]
        console.log(rates)
        for (let i = 0; i < Math.min(quantities.length, rates.length); i++) {
            let quantity = quantities[i]
            let rate = rates[i]
            totalValue[i] = (quantity.quantity * rate.sellingPrice)/100*(100-quantity.discount);
            console.log(totalValue)
           //return totalValue
        }
        console.log(totalValue)    
        return totalValue.map(value=>{
            return(
                <p key={rates.id}>{value.toFixed(2)}</p>
            )
        })   
    }
    renderQuotationDetails() {
        if (!this.props.quotation.productsList) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        return (
            <tr>
                <td>
                    {this.props.quotation.productsList.map(product => {
                        return (
                            <p key={product.id}>FG{product.productCode}</p>
                        )
                    })
                    }
                </td>
                <td> {this.props.quotation.productsList.map(product => {
                    return (
                        <p key={product.id}>{product.productName}</p>
                    )
                })
                }</td>
                <td> {this.props.quotation.productsList.map(product => {
                    return (
                        <p key={product.id}>{product.baseUnitMeasure}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.quotation.products.map(product => {
                    return (
                        <p key={product.id}>{product.quantity}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}>
                    {this.props.quotation.productsList.map(product => {
                        return (
                            <p key={product.id}>{product.sellingPrice}</p>
                        )
                    })
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {this.props.quotation.products.map(product => {
                        return (
                            <p key={product.id}>{product.discount}%</p>
                        )
                    })
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {this.props.quotation.products.map(product => {
                        return (
                            <p key={product.id}>{product.currency}</p>
                        )
                    })
                    }
                </td>
                <td style={{ textAlign: "right" }}>
                    {this.getTotal()}
                </td>


            </tr>
        )
    }
    renderCustomerDetails() {
        if (!this.props.quotation.customerDetails) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        return (
            <div>
                <p><strong>Company Name:</strong>{this.props.quotation.customerDetails.map(customer => {
                    return (
                        <span key={customer.id}>{customer.companyName}</span>
                    )
                })
                }</p>
                <p><strong>Address:</strong> {this.props.quotation.customerDetails.map(customer => {
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
                }</p>
                <p><strong>Email: </strong>{this.props.quotation.customerDetails.map(customer => {
                    return (
                        <span key={customer.id}>{customer.email}</span>
                    )
                })
                }</p>
                <p><strong>Contact Number: </strong>{this.props.quotation.customerDetails.map(customer => {
                    return (
                        <span key={customer.id}>{customer.mobileNo}</span>
                    )
                })
                }</p>
                <p><strong>Date: </strong>{moment(this.props.quotation.date).format('DD/MM/YYYY')}

                </p>
            </div>
        )

    }
    renderPrintButton() {
        if (this.props.quotation.quotation_state === "Pending") {
            return (
                <div>
                    <Link to={"/quotation-dashboard"} type="button" className="ui button">Back</Link>
                    <Link to={`/delete-quotation/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        } else if (this.props.quotation.quotation_state === "Approved") {
            return (
                <div>
                    <Link to={"/quotation-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/delete-quotation/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        }
    }
    onClick = () => {
        this.props.printQuotation(this.props.quotation.id)
    }

    render() {
        if (!this.props.quotation) {
            console.log(this.props.quotation)
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
                    <h3>Quotation #{this.props.quotation.quotationNumber}</h3>
                    <p><strong>Quotation State:</strong><span style={{ color: "red" }}> {this.props.quotation.quotation_state}</span></p>
                    {this.renderCustomerDetails()}
                    <table className="ui celled small padded compact structured table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Quotation Details</h4></th>
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
                            {this.renderQuotationDetails()}
                        </tbody>
                    </table>
                    <div>
                        {this.renderPrintButton()}
                    </div>

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
    const quotation = state.quotations[ownProps.match.params.id]
    console.log(quotation)
    return { errorMessage: state, customers: customers, products: products, quotation: quotation };
}
// const formWrapped = reduxForm({
//     form: 'invoicePayments'
// })(ViewQuotation);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchQuotation, printQuotation })(ViewQuotation);