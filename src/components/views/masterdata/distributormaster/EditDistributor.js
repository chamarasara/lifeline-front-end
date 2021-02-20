import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDistributor, editDistributor, fetchFinishGoods } from '../../../../actions';
class EditDistributor extends React.Component {
    componentDidMount() {
        this.props.fetchDistributor(this.props.match.params.id);
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
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
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
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Product</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.editDistributor(this.props.distributor._id, formValues)
        console.log(formValues)
    }
    render() {
        if (!this.props.distributor) {
            return <div><div className="ui active inline loader"></div></div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Distributor Details</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Company Name
                                <Field name="companyName" component={this.renderInput} placeholder={this.props.distributor.companyName} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Contact Number 1
                                <Field name="mobileNo1" component={this.renderInput} placeholder={this.props.distributor.mobileNo1} type="text" />
                            </div>
                            <div className="four wide field">
                                Contact Number 2
                                <Field name="mobileNo2" component={this.renderInput} placeholder={this.props.distributor.mobileNo2} type="text" />
                            </div>
                            <div className="four wide field">
                                Fax
                                <Field name="fax" component={this.renderInput} placeholder={this.props.distributor.fax} type="text" />
                            </div>
                            <div className="four wide field">
                                Registration Number
                                <Field name="registerNo" component={this.renderInput} placeholder={this.props.distributor.registerNo} type="text" />
                            </div>
                            <div className="four wide field">
                                Email
                                <Field name="email" component={this.renderInput} placeholder={this.props.distributor.email} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Contact Person Name
                                <Field name="distributorName" component={this.renderInput} placeholder={this.props.distributor.distributorName} type="text" />
                            </div>
                            <div className="four wide field">
                                Credit Period
                                <Field name="creditPeriod" component={this.renderInput}  placeholder="Credit Period" type="number" />
                            </div>
                            <div className="four wide field">
                                Credit Amount
                                <Field name="creditAmount" component={this.renderInput} placeholder="Credit Amount" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                Company Address-
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                No
                                <Field name="communicationAddress.no" component={this.renderInput} placeholder={this.props.distributor.communicationAddress.no} type="text" />
                            </div>
                            <div className="four wide field">
                                Lane
                                <Field name="communicationAddress.lane" component={this.renderInput} placeholder={this.props.distributor.communicationAddress.lane} type="text" />
                            </div>
                            <div className="four wide field">
                                City
                                <Field name="communicationAddress.city" component={this.renderInput} placeholder={this.props.distributor.email} type="text" />
                            </div>
                            <div className="four wide field">
                                Postal Code
                                <Field name="communicationAddress.postalCode" component={this.renderInput} placeholder={this.props.distributor.communicationAddress.postalCode} type="text" />
                            </div>
                            <div className="four wide field">
                                Country
                                <Field name="communicationAddress.country" component={this.renderSelectField} placeholder={this.props.distributor.communicationAddress.country} type="text" >
                                    <option>-Select Country-</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                </Field>
                            </div>
                        </div>                        
                        <div className="fields">
                            <div className="three wide field">
                                Nationality
                                <Field name="state" component={this.renderSelectField} placeholder={this.props.distributor.state} type="text" >
                                    <option>-Select Nationality-</option>
                                    <option value="local">Local</option>
                                    <option value="foriegn">Foreign</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                Currency
                                <Field name="currency" component={this.renderSelectField} placeholder={this.props.distributor.currency} type="text" >
                                    <option>-Select Currency-</option>
                                    <option value="LKR">LKR</option>
                                    <option value="USD">USD</option>
                                    <option value="INR">INR</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Products <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <FieldArray name="products" component={this.renderProductsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/distributor-profile/${this.props.distributor.id}`} className="ui button">
                                Back
                            </Link>
                            <button type="submit" className="ui primary button">Update</button>
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
    if (!formValues.products || !formValues.products.length) {
        errors.products = { _error: 'At least one product must be entered' }
    }
    if (!formValues.distributorName) {
        errors.distributorName = 'Required';
    }
    if (!formValues.companyName) {
        errors.companyName = 'Required';
    }
    if (!formValues.mobileNo1) {
        errors.mobileNo1 = 'Required';
    }
    if (!formValues.email) {
        errors.email = 'Required';
    }
    if (!formValues.creditPeriod) {
        errors.creditPeriod = 'Required';
    }
    if (!formValues.creditAmount) {
        errors.creditAmount = 'Required';
    }
    if (!formValues.state) {
        errors.state = 'Required';
    }
    if (!formValues.currency) {
        errors.currency = 'Required';
    }
    if (!formValues.communicationAddress) {
        errors.communicationAddress = { no: "Required", lane: "Required", city: "Required", postalCode: "Required", country: "Required" };
    }
    return errors;
}
const mapStateToProps = (state, ownPorps) => {
    const products = Object.values(state.finishGoods) 
    const distributor = state.distributor[ownPorps.match.params.id] 
    return { errorMessage: state, distributor: distributor, products: products, initialValues: distributor };
}
const formWrapped = reduxForm({
    form: 'editDistributor',
    validate: validate
})(EditDistributor);
export default connect(mapStateToProps, { fetchDistributor, editDistributor, fetchFinishGoods })(formWrapped);