import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCustomers, updateQuotation, fetchFinishGoods, fetchQuotation, printQuotation } from '../../../../actions';

class ApprovalsEditQuotation extends React.Component {

    componentDidMount() {
        this.props.fetchCustomers()
        this.props.fetchFinishGoods()
        this.props.fetchQuotation(this.props.match.params.id)
        console.log(this.props.order)
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
                    {fields.map((productsList, index) => <li key={index}>
                        <label htmlFor={productsList}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${productsList}.id`} type="text" required component="select" >
                                    <option>-Select Material-</option>
                                    {this.renderProducts()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                <Field name={`${productsList}.discount`} type="number" required component={this.renderInput} placeholder="Discount" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${productsList}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${productsList}.currency`} required component="select" placeholder="" type="text" >
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
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Raw Material</button>

            </div>
        )
    }

    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.updateQuotation(this.props.quotation._id, formValues)
    }

    render() {
        if (!this.props.quotation) {
            return (
                <div className="ui active centered inline loader"></div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Edit Quotation</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="customerId" component="select" placeholder="" type="text" >
                                <option>-Select Supplier-</option>
                                {this.renderCustomers()}
                            </Field>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <label>Raw Materials- </label>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/approvals-single-quotation/${this.props.match.params.id}`} type="button" className="ui button">Back</Link>
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
const mapStateToProps = (state, ownProps) => {
    const customers = Object.values(state.customer)
    const products = Object.values(state.finishGoods)
    const quotation = state.quotations[ownProps.match.params.id]
    console.log(state.finishGoods)
    return { errorMessage: state, customers: customers, products: products, quotation: quotation, initialValues: quotation };
}
const formWrapped = reduxForm({
    form: 'approvalsEditQuotation'
})(ApprovalsEditQuotation);

export default connect(mapStateToProps, { fetchCustomers, updateQuotation, fetchFinishGoods, fetchQuotation, printQuotation })(formWrapped);