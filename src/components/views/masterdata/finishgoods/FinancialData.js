import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';


class FinancialData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
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
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Financial Data</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="four wide field">
                                Selling Price <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="sellingPrice" component={this.renderInput} placeholder="Selling Price" type="number" />
                            </div>                             
                            <div className="four wide inline field">
                                Retailer Margin %<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="retailerMargin" component={this.renderInput} placeholder="Retailer Margin %" type="number" />
                                <div className="ui pointing label">
                                    {this.props.retailerMarginTotal}
                                </div>
                            </div> 
                            <div className="four wide inline  field">
                                Distributor Margin % <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="distributorMargin" component={this.renderInput} placeholder="Distributor Margin %" type="number" />
                                <div className="ui pointing label">
                                    {this.props.factoryPrice}
                                </div>
                            </div>                          
                        </div>
                        <div className="fields">
                            <h5>Factory Price: {this.props.factoryPrice}</h5>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Maximum Discount %<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="maximumDiscount" component={this.renderInput} placeholder="Maximum Discount %" type="number" />
                            </div>
                            <div className="four wide field">
                                Free Issues (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="freeIssues" component={this.renderInput} placeholder="Free Issues" type="number" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" className="ui primary button">Next</button>
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
    if (!formValues.factoryPrice) {
        errors.factoryPrice = 'Required!';
    }
    if (!formValues.distributorMargin) {
        errors.distributorMargin = 'Required!';
    }
    if (!formValues.retailerMargin) {
        errors.retailerMargin = 'Required!';
    }
    // if (!formValues.freeIssues) {
    //     errors.freeIssues = 'Required!';
    // }
    if (!formValues.maximumDiscount) {
        errors.maximumDiscount = 'Required!';
    }
    if (!formValues.sellingPrice) {
        errors.sellingPrice = 'Required!';
    }
    return errors;
}

const selector = formValueSelector('newFinishGood')
const mapStateToProps = (state) => {
    const sellingPrice = selector(state, 'sellingPrice')
    const distributorMargin = selector(state, 'distributorMargin')
    const retailerMargin = selector(state, 'retailerMargin')
    const retailerMarginTotal = sellingPrice / 100 * (100 - retailerMargin)
    const factoryPrice = retailerMarginTotal / 100 * (100 - distributorMargin)
    return { sellingPrice: sellingPrice, factoryPrice, retailerMarginTotal };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(FinancialData);
export default connect(mapStateToProps, {})(formWrapped);