import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDistributor, fetchFinishGoods } from '../../../../actions';
class NewDistributor extends React.Component {

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
            console.log(this.props)
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
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
    renderSuccessMessage() {
        if (this.props.distributor[0] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createDistributor(formValues)
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
    renderAreasDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>

                    {fields.map((areas, index) => <li key={index}>
                        <label htmlFor={areas}>Area #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${areas}.city`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Area-</option>
                                    <option value="Colombo">Colombo</option>
                                    <option value="Gampaha">Gampaha</option>
                                    <option value="Kandy">Kandy</option>
                                    <option value="Galle">Galle</option>
                                    <option value="Matara">Matara</option>
                                    <option value="Hambantota">Hambantota</option>
                                    <option value="Kalutara">Kalutara</option>
                                    <option value="Horana">Horana</option>
                                    <option value="Kurunagala">Kurunagala</option>
                                    <option value="Badulla">Badulla</option>
                                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Area</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }
    render() {

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "30px", paddingLeft: "30px", paddingBottom: "20px", paddingRight: "30px" }}>
                        <h3>Create New Distributor</h3>
                        <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="sixteen wide field">
                                Company Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="companyName" component={this.renderInput} required placeholder="Company Name" type="text" />
                            </div>
                            <div className="fields">
                                <div className="four wide field">
                                    Contact Number 1<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="mobileNo1" component={this.renderInput} required placeholder="Contact Number 1" type="text" />
                                </div>
                                <div className="four wide field">
                                    Contact Number 2 (Optional)
                                    <Field name="mobileNo2" component={this.renderInput} required placeholder="Contact Number 2" type="text" />
                                </div>
                                <div className="three wide field">
                                    Fax (Optional)
                                    <Field name="fax" component={this.renderInput} placeholder="Fax" type="text" />
                                </div>
                                <div className="four wide field">
                                    Registration Number (Optional)
                                    <Field name="registerNo" component={this.renderInput} placeholder="Registration Number" type="text" />
                                </div>
                                <div className="five wide field">
                                    Email <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="email" component={this.renderInput} required placeholder="Email" type="text" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="eight wide field">
                                    Contact Person Name (Optional)
                                    <Field name="distributorName" component={this.renderInput} required="true" placeholder="Contact Person Name" type="text" />
                                </div>
                                <div className="four wide field">
                                    Credit Period (Days) <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="creditPeriod" component={this.renderInput} required placeholder="Credit Period(Days)" type="number" />
                                </div>
                                <div className="four wide field">
                                    Credit Amount <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="creditAmount" component={this.renderInput} required placeholder="Credit Amount" type="number" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="five wide field">
                                    Company Address-<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    No <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.no" component={this.renderInput} placeholder="No" type="text" />
                                </div>
                                <div className="four wide field">
                                    Lane <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.lane" component={this.renderInput} placeholder="Lane" type="text" />
                                </div>
                                <div className="four wide field">
                                    City <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.city" component={this.renderInput} placeholder="City" type="text" />
                                </div>
                                <div className="four wide field">
                                    Postal Code <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.postalCode" component={this.renderInput} placeholder="Postal Code" type="text" />
                                </div>
                                <div className="four wide field">
                                    Country <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="communicationAddress.country" component={this.renderSelectField} placeholder="Country" type="text" >
                                        <option>-Select Country-</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="three wide field">
                                    Nationality <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="state" component={this.renderSelectField} placeholder="Country" type="text" >
                                        <option>-Select Nationality-</option>
                                        <option value="local">Local</option>
                                        <option value="foriegn">Foreign</option>
                                    </Field>
                                </div>
                                <div className="three wide field">
                                    Currency <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <Field name="currency" component={this.renderSelectField} placeholder="Country" type="text" >
                                        <option>-Select Currency-</option>
                                        <option value="LKR">LKR</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="eight wide field">
                                    Products <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <FieldArray name="products" component={this.renderProductsDropDown} />
                                </div>
                                <div className="eight wide field">
                                    Areas cover  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                    <FieldArray name="areas" component={this.renderAreasDropDown} />
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/distributor-dashboard"} className="ui button">Back</Link>
                                <button type="submit" className="ui primary button">Submit</button>
                            </div>
                        </form>
                        {this.renderSuccessMessage()}
                    </div>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.products || !formValues.products.length) {
        errors.products = { _error: 'At least one product must be add' }
    } else {
        const productsArrayErrors = []
        formValues.products.forEach((product, index) => {
            const productErrors = {}
            if (!product || !product.id) {
                productErrors.id = 'Required'
                productsArrayErrors[index] = productErrors
            }
        })
        if (productsArrayErrors.length) {
            errors.products = productsArrayErrors
        }
    }
    if (!formValues.areas || !formValues.areas.length) {
        errors.areas = { _error: 'At least one area must be add' }
    } else {
        const areasArrayErrors = []
        formValues.areas.forEach((area, index) => {
            const areaErrors = {}
            if (!area || !area.city) {
                areaErrors.city = 'Required'
                areasArrayErrors[index] = areaErrors
            }
        })
        if (areasArrayErrors.length) {
            errors.areas = areasArrayErrors
        }
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
const mapStateToProps = (state) => {
    const userRoles = Object.values(state.userRoles)
    const products = Object.values(state.finishGoods)
    const distributor = Object.values(state.distributor)
    return { errorMessage: state, userRoles: userRoles, products: products, distributor: distributor };
}
const formWrapped = reduxForm({
    form: 'newDistributor',
    validate: validate
})(NewDistributor);
export default connect(mapStateToProps, { createDistributor, fetchFinishGoods })(formWrapped);