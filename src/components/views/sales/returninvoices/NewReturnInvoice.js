import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchFinishGoods, fetchInvoice, updateInvoice, createReturnInvoice, printInvoice } from '../../../../actions';

class NewReturnInvoice extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchFinishGoods()
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
    renderSelectField = ({ input, label, type, meta, children }) => (
        <div>
            <label>{label}</label>
            <div>
                <select {...input}>
                    {children}
                </select>
                {this.renderError(meta)}
            </div>
        </div>
    )
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderProductsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                    {fields.map((products, index) => <li key={index}>
                        <label htmlFor={products}>Product #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${products}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.discount`} type="number" required component={this.renderInput} placeholder="Discount" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.currency`} required component={this.renderSelectField} placeholder="" type="text" >
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
            </div>
        )
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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


    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createReturnInvoice(formValues)
        const haveReturns ="Yes"
        this.props.updateInvoice(formValues._id, haveReturns )
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
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Products <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fourteen wide field">
                                Reason
                                <Field name="reason" type="text" component="input" placeholder="Reason" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/edit-invoice/${this.props.match.params.id}`} type="button" className="ui button">Back</Link>
                            <button type="submit" disabled={this.props.submitting} className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.finishGoods)
    const invoice = state.invoices[ownProps.match.params.id]
    console.log(products)
    return { errorMessage: state, customers: customers, products: products, invoice: invoice, initialValues: invoice };
}
const formWrapped = reduxForm({
    form: 'newReturnInvoice'
})(NewReturnInvoice);

export default connect(mapStateToProps, { fetchCustomers, fetchFinishGoods, updateInvoice, fetchInvoice, createReturnInvoice, printInvoice })(formWrapped);