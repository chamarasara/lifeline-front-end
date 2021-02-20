import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditFinishGoodMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGood(this.props.match.params.id)

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
    onSubmit = (formValues) => {
        this.props.editFinishGood(this.props.material._id, formValues)
        console.log(formValues)
    }
    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <h4>Please select a Finish Good</h4>
                    </div>
                </div>
            )
        }

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Financial Data</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="four wide field">
                                Selling Price <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="sellingPrice" component={this.renderInput} placeholder="Selling Price" type="number" />
                            </div>
                            <div className="four wide field">
                                Factory Price  <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="factoryPrice" component={this.renderInput} placeholder="Factory Price" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Distributor Margin % <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="distributorMargin" component={this.renderInput} placeholder="Distributor Margin %" type="number" />
                                <div className="ui pointing label">
                                    {this.props.distributorMarginTotal}
                                </div>
                            </div>
                            <div className="four wide field">
                                Retailer Margin %<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="retailerMargin" component={this.renderInput} placeholder="Retailer Margin %" type="number" />
                                <div className="ui pointing label">
                                    {this.props.retailerMarginTotal}
                                </div>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Maximum Discount %<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="maximumDiscount" component={this.renderInput} placeholder="Maximum Discount %" type="number" />
                            </div>
                            <div className="four wide field">
                                Free Issues <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="freeIssues" component={this.renderInput} placeholder="Free Issues" type="number" />
                            </div>
                        </div>                       
                        <div className="field">
                            <Link to={`/single-finish-good-material/${this.props.material.id}`} className="ui button">Back</Link>
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
    if (!formValues.factoryPrice) {
        errors.factoryPrice = 'Required!';
    }
    if (!formValues.distributorMargin) {
        errors.distributorMargin = 'Required!';
    }
    if (!formValues.retailerMargin) {
        errors.retailerMargin = 'Required!';
    }
    if (!formValues.freeIssues) {
        errors.freeIssues = 'Required!';
    }
    if (!formValues.maximumDiscount) {
        errors.maximumDiscount = 'Required!';
    }
    if (!formValues.sellingPrice) {
        errors.sellingPrice = 'Required!';
    }
    return errors;
}
const selector = formValueSelector('editFinishGoodMaterial')
const mapStateToProps = (state, ownPorps) => {
    const material = state.finishGoods[ownPorps.match.params.id]
    const sellingPrice = selector(state, 'sellingPrice')
    const distributorMargin = selector(state, 'distributorMargin')
    const retailerMargin = selector(state, 'retailerMargin')
    const distributorMarginTotal = sellingPrice * distributorMargin / 100
    const retailerMarginTotal = sellingPrice * retailerMargin / 100
    return {
        material,
        initialValues: material,
        distributorMarginTotal,
        retailerMarginTotal
    };
}
const formWrapped = reduxForm({
    form: 'editFinishGoodMaterial',
    validate: validate
})(EditFinishGoodMaterial);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood })(formWrapped);