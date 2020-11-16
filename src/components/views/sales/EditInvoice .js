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
            console.log(this.props)
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

    onSubmit = (formValues) => {
        this.props.editInvoice(this.props.invoice._id, formValues)
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
                <p><strong>Customer Name:</strong>{this.props.invoice.customer.map(customer => {
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
    renderProductsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((products, index) => <li key={index}>
                        <label htmlFor={products}>Product #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${products}.id`} type="text" required component="select" >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${products}.uom`} type="text" required component="input" placeholder="UOM" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${products}.rate`} type="number" required component="input" placeholder="Rate" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.currency`} required component="select" placeholder="" type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR">LKR</option>
                                    <option value="USD">USD</option>
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>

            </div>
        )
    }
    renderForm = () => {
        return (
            <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="six wide field">
                    <Field name="customerId" component="select" placeholder="" type="text" >
                        <option>-Invoice Status-</option>
                        <option value="disabled">Disabled</option>
                    </Field>
                </div>                
                <div className="field">
                   
                    
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <button type="submit" className="ui primary button">Submit</button>
                </div>
            </form>
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
                    <p>Loading....</p>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
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
    console.log(state)
    const customers = Object.values(state.customer)
    const products = Object.values(state.productMaster)
    const invoice = state.invoices[ownProps.match.params.id]
    console.log(invoice)
    return { errorMessage: state, customers: customers, products: products, invoice: invoice, initialValues: invoice };
}
const formWrapped = reduxForm({
    form: 'editInvoice'
})(EditInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchProductsMaster, fetchInvoice, editInvoice, printInvoice })(formWrapped);