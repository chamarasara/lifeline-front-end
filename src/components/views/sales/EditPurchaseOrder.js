import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrder, fetchCustomers, fetchProductsMaster, createPurchaseOrder, editPurchaseOrder } from '../../../actions';

class EditPurchaseOrder extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrder(this.props.match.params.id)
        console.log(this.props.match.params.id)
        this.props.fetchCustomers()
        this.props.fetchProductsMaster()
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
            </div>
        );
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
                                <Field name={`${products}.id`} type="text" required component="select" >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${products}.quantity`} type="number" required component="input" placeholder="Quantity" >
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
    onSubmit = (formValues) => {
        this.props.editPurchaseOrder(this.props.order._id, formValues)
    }

    render() {
        
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Edit Purchase Order</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="customerId" component="select" placeholder="" type="text" >
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
                            <Link to={"/purchase-order-dashboard"} type="button" className="ui button">Back</Link>
                            <Link to={`/delete-purchase-order/${this.props.match.params.id}`} type="button" className="ui red button">Delete</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
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
const mapStateToProps = (state, ownPorps) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.productMaster)
    console.log(state.purchaseOrders[ownPorps.match.params.id])
    return { errorMessage: state, customers: customers, products: products, order: state.purchaseOrders[ownPorps.match.params.id], initialValues: state.purchaseOrders[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editPurchaseOrder',
})(EditPurchaseOrder);

export default connect(mapStateToProps, { fetchPurchaseOrder, fetchCustomers, fetchProductsMaster, createPurchaseOrder, editPurchaseOrder })(formWrapped);