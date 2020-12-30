import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchCustomers, fetchFinishGoods, createQuotation } from '../../../../actions';

class NewQuotation extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
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
                <option key={customer._id} value={customer.id}>{customer.companyName}</option>
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
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createQuotation(formValues)
    }
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderProductsDropDown = ({ fields }) => {
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
                                <Field name={`${products}.discount`} type="number" required component={this.renderInput} placeholder="Discount" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${products}.currency`} required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR" selected >LKR</option>
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
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Quotation</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="customerId" component={this.renderSelectField} placeholder="" type="text" >
                                <option>-Select Customer-</option>
                                {this.renderCustomers()}
                            </Field>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <label>Products- </label>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/quotation-dashboard"} type="button" className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.customerId) {
        errors.customerId = 'Required';
    }
    if (!formValues.products) {
        errors.products = 'Please add products';
    }
    // if (!formValues.address) {
    //     errors.address = 'Please enter the Number of the Address';
    // }
    // if (!formValues.nic) {
    //     errors.nic = 'Please enter the ID Nummber';
    // }
    // if (!formValues.mobileNo) {
    //     errors.mobileNo = 'Please enter Phone Number';
    // }
    // if (!formValues.email) {
    //     errors.email = 'Please enter Email';
    // }
    // if (!formValues.gender) {
    //     errors.gender = 'Please enter the Gender';
    // }
    return errors;
}
const mapStateToProps = (state) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.finishGoods)
    return { errorMessage: state, customers: customers, products: products };
}
const formWrapped = reduxForm({
    form: 'newQuotation',
    validate: validate
})(NewQuotation);

export default connect(mapStateToProps, { fetchCustomers, fetchFinishGoods, createQuotation })(formWrapped);