import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchFinishGoods, fetchInvoice, updateDispatchNote, createReturnInvoice, printInvoice } from '../../../../actions';

class NewDispatchNote extends React.Component {

    componentDidMount() {
        this.props.fetchFinishGoods()
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
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }


    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.updateDispatchNote(formValues._id, formValues)
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
                <div>                
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <h4>Create New Dispatch Note </h4>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fourteen wide field">                               
                                <Field name="remarks" type="text" component="input" placeholder="Remarks" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={''} type="button" className="ui button">Back</Link>
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
    const products = Object.values(state.finishGoods)
    const invoice = ownProps.data
    console.log(ownProps)
    return { errorMessage: state, products: products, invoice: invoice, initialValues: invoice };
}
const formWrapped = reduxForm({
    form: 'newDispatchNote'
})(NewDispatchNote);

export default connect(mapStateToProps, { fetchCustomers, fetchFinishGoods, updateDispatchNote, fetchInvoice, createReturnInvoice, printInvoice })(formWrapped);