import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
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


    renderInvoiceDetails() {
        return (
            <tr>
                <td>
                    {this.props.invoice.productsList.map(product => {
                        return (
                            <p key={product.id}>{product.productCode}</p>
                        )
                    })
                    }
                </td>
                <td> {this.props.invoice.productsList.map(product => {
                    return (
                        <p key={product.id}>{product.productName}</p>
                    )
                })
                }</td>
                <td> {this.props.invoice.products.map(product => {
                    return (
                        <p key={product.id}>{product.uom}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.invoice.products.map(product => {
                    return (
                        <p key={product.id}>{product.quantity}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.invoice.products.map(product => {
                    return (
                        <p key={product.id}>{product.rate}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.invoice.products.map(product => {
                    return (
                        <p key={product.id}>{product.rate * product.quantity}</p>
                    )
                })
                }</td>

            </tr>
        )

    }
    renderCustomerDetails() {
        return (
            <div>
                <p><strong>Company Name:</strong>{this.props.invoice.customer.map(customer => {
                    return (
                        <span key={customer.id}>{customer.companyName}</span>
                    )
                })
                }</p>
                <p><strong>Address:</strong> {this.props.invoice.customer.map(customer => {
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
                <p><strong>Email: </strong>{this.props.invoice.customer.map(customer => {
                    return (
                        <span key={customer.id}>{customer.email}</span>
                    )
                })
                }</p>
                <p><strong>Contact Number: </strong>{this.props.invoice.customer.map(customer => {
                    return (
                        <span key={customer.id}>{customer.mobileNo}</span>
                    )
                })
                }</p>
                <p><strong>Date: </strong>{moment(this.props.invoice.date).format('DD/MM/YYYY')}

                </p>
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
                            <div className="four wide field">
                                <Field name={`${payments}.cashAmount`} type="number" required component="input" placeholder="Cash Amount" >
                                </Field>
                            </div>
                            <div className="five wide field">
                                <Field name={`${payments}.chequeAmount`} type="number" required component="input" placeholder="Cheque Amount" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${payments}.chequeNumber`} type="text" required component="input" placeholder="Cheque Number" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${payments}.bankName`} type="text" required component="input" placeholder="Bank Name" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${payments}.chequeDate`} type="date" required component="input" placeholder="Cheque Date" >
                                </Field>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Payment</button>
            </div>
        )
    }
    renderPaymentsForm = () => {
        return (
            <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="fields">
                    <div className="sixteen wide field">
                        <label>Pay- </label>
                        <FieldArray name="payments" component={this.renderPaymentsFields} />
                    </div>
                </div>
                <div className="field">
                    <Link to={"/invoice-dashboard"} type="button" className="ui button">Back</Link>
                    <button type="submit" className="ui primary button">Submit</button>
                </div>
            </form>
        )
    }
    renderPayments = () => {
        return (
            <div>
                <h4 style={{ paddingTop: "20px" }}>Payments: </h4>
                <p><b>Total Value:</b> {this.getTotalAmount()}</p>                
                {this.renderPaymentsForm()}
            </div>
        )
    }
    getTotalAmount() {
        const quantities = this.props.invoice.products.map(data => {
            return data.quantity * data.rate
        })
        const total = quantities.reduce((a, b) => (a + b))
        return total

    }
    // getTotalPaid() {
    //     if (!this.props.invoice.payments) {
    //         return 0
    //     } else {            
    //         const paid = this.props.invoice.payments.map(data => {
    //             const total = parseInt(data.cashAmount) + parseInt(data.chequeAmount)
    //             return total
    //         })
            
    //         const total1 = paid.reduce((a, b) => (a + b))
    //         return total1
    //     }
    // }
    onClick = () => {
        this.props.printInvoice(this.props.invoice.id)
    }
    onSubmit = (formValues) => {
        this.props.editInvoice(this.props.invoice._id, formValues)
    }
    render() {
        if (!this.props.invoice) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <p>Loading....</p>
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
                                <th style={{ textAlign: "right" }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInvoiceDetails()}
                        </tbody>
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
//Form input validation
// const validate = (formValues) => {
//     const errors = {}
//     if (!formValues.firstName) {
//         errors.firstName = 'Please enter First Name';
//     }
//     if (!formValues.lastName) {
//         errors.lastName = 'Please enter Last Name';
//     }
//     if (!formValues.address) {
//         errors.address = 'Please enter the Number of the Address';
//     }
//     if (!formValues.nic) {
//         errors.nic = 'Please enter the ID Nummber';
//     }
//     if (!formValues.mobileNo) {
//         errors.mobileNo = 'Please enter Phone Number';
//     }
//     if (!formValues.email) {
//         errors.email = 'Please enter Email';
//     }
//     if (!formValues.gender) {
//         errors.gender = 'Please enter the Gender';
//     }
//     return errors;
// }
const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.productMaster)
    const invoice = state.invoices[ownProps.match.params.id]
    return { errorMessage: state, customers: customers, products: products, invoice: invoice, initialValues: invoice };
}
const formWrapped = reduxForm({
    form: 'invoicePayments'
})(EditInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice })(formWrapped);