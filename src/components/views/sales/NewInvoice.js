import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class NewInvoice extends React.Component {

    componentDidMount() {

    }
    productOne = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
    }
    productTwo = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
    }
    productThree = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
    }
    productFour = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
    }
    productFive = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
    }
    productSix = {
        productId: "", quantity: "", uom: "", rate: "", currency: ""
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
        console.log(formValues)
    }

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Invoice</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="customerId" component="select" placeholder="" type="text" >
                                <option>-Select Customer-</option>
                                <option value="Customer">Customer</option>
                            </Field>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productOne.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productOne.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productOne.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productOne.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productOne.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productTwo.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productTwo.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productTwo.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productTwo.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productTwo.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productThree.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productThree.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productThree.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productThree.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productThree.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productFour.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productFour.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFour.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFour.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFour.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productFive.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productFive.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFive.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFive.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productFive.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="six wide field">
                                <label>Select Product One</label>
                                <Field name="productSix.productId" component="select" placeholder="" type="text" >
                                    <option>-Select Product-</option>
                                    <option value="Customer">Product One</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="productSix.quantity" component={this.renderInput} placeholder="Prouct Quantity" label="Quantity" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productSix.uom" component={this.renderInput} placeholder="UOM" label="UOM" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productSix.rate" component={this.renderInput} placeholder="Rate" label="Rate" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="productSix.currency" component={this.renderInput} placeholder="Currency" label="Currency" type="text" />
                            </div>
                        </div>                        
                        <div className="field">
                            <Link to={"/purchase-order-dashboard"} type="button" className="ui button">Back</Link>
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
    if (!formValues.firstName) {
        errors.firstName = 'Please enter First Name';
    }
    if (!formValues.lastName) {
        errors.lastName = 'Please enter Last Name';
    }
    if (!formValues.address) {
        errors.address = 'Please enter the Number of the Address';
    }
    if (!formValues.nic) {
        errors.nic = 'Please enter the ID Nummber';
    }
    if (!formValues.mobileNo) {
        errors.mobileNo = 'Please enter Phone Number';
    }
    if (!formValues.email) {
        errors.email = 'Please enter Email';
    }
    if (!formValues.gender) {
        errors.gender = 'Please enter the Gender';
    }
    return errors;
}
const mapStateToProps = (state) => {
    console.log(state)
    const userRoles = Object.values(state.userRoles)
    console.log(userRoles)
    return { errorMessage: state, userRoles: userRoles };
}
const formWrapped = reduxForm({
    form: 'newPurchaseOrder',
    validate: validate
})(NewInvoice);

export default connect(mapStateToProps, {})(formWrapped);