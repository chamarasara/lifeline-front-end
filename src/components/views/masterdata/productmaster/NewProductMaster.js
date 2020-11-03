import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProductMaster } from '../../../../actions';
class NewProductMaster extends React.Component {

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
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.createProductMaster(formValues)
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h5>New Product</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                        </div>
                        <div className="fields">
                            <div className="ten wide field">
                                <Field name="productName" component={this.renderInput} placeholder="Product Name" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="productCode" component={this.renderInput} placeholder="Product Code" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="productUom" component={this.renderInput} placeholder="UOM" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="sellingPrice" component={this.renderInput} placeholder="Selling Price" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="directCost" component={this.renderInput} placeholder="Direct Cost" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="inDirectCost" component={this.renderInput} placeholder="Indirect Cost" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="profitMargin" component={this.renderInput} placeholder="Profit Margin" type="number" />
                            </div></div>

                        <div className="field">
                            <Link to={"/products-dashboard"} className="ui button">Back</Link>
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
//     if (!formValues.customerName) {
//         errors.customerName = 'Please enter Customer Name';
//     }
//     if (!formValues.fax) {
//         errors.fax = 'Please enter Fax Number';
//     }
//     if (!formValues.registerNo) {
//         errors.registerNo = 'Please enter Registration Number';
//     }
//     if (!formValues.companyName) {
//         errors.companyName = 'Please enter Company Name';
//     }
//     if (!formValues.communicationAddress) {
//         errors.communicationAddress = 'Please enter the Number of the Comunication Address';
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
// const mapStateToProps = (state) => {
//     return { errorMessage: state };
// }
const formWrapped = reduxForm({
    form: 'newProductMaster'
})(NewProductMaster);
export default connect(null, { createProductMaster })(formWrapped);