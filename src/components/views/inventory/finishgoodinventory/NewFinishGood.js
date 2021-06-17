import React from 'react';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import moment from 'moment'
import { connect } from 'react-redux';
import { fetchFinishGoods, createFinishGoodInventory } from '../../../../actions';
import { Link } from 'react-router-dom'

class NewFinishGood extends React.Component {
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

    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.id}>{product.productName}</option>
            )
        })
    }
    renderManufaturingDelayField() {

        const userInputDate = new Date(this.props.getManufaturingDate);
        const currentDate = new Date();

        var diff = new Date(currentDate.getTime() - userInputDate.getTime());
        const diffDays = diff.getUTCDate() - 1

        if (diffDays >= 7) {
           return(
               <div className="eight wide field">
                   <span style={{ color: "red", fontSize: "14px" }}>The manufacturing date that you enterd is older more than 7 days. Please enter the reason for the delay! *</span>
                   <Field name="reasonForDelay" required component={this.renderInput} placeholder="Reason for the delay" type="text" />
               </div>
           )
        }

    }
  
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createFinishGoodInventory(formValues)
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>New Finish Good-Inventory</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                Product <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="productId" type="text" required component={this.renderSelectField} >
                                    <option>-Select Product-</option>
                                    {this.renderProducts()}
                                   
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                Quantity <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="quantity" required component={this.renderInput} placeholder="Quantity" type="number" />
                            </div>
                            <div className="three wide field">
                                Batch Number <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="batchNumber" required component={this.renderInput} placeholder="Batch Number" type="text" />
                            </div>
                            <div className="three wide field">
                                Manufacturing Date <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="manufacturingDate" required component={this.renderInput} type="date" />
                            </div>
                        </div>
                        <div className="fields">
                            {this.renderManufaturingDelayField()}
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Description(optional)
                                <Field name="finishGoodDescription" component="textarea" placeholder="Remarks(Optional)" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/finish-good-inventory-dashboard"} className="ui button">Back</Link>
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
    if (!formValues.productId) {
        errors.productId = 'Required!';
    }
    if (!formValues.quantity) {
        errors.quantity = 'Required!';
    }
    if (!formValues.batchNumber) {
        errors.batchNumber = 'Required!';
    }
    if (!formValues.manufacturingDate) {
        errors.manufacturingDate = 'Required!';
    }
    
    return errors;
}

const formWrapped = reduxForm({
    form: 'newFinishGoodInventory',
    validate: validate
})(NewFinishGood);

const selector = formValueSelector('newFinishGoodInventory')

const mapStateToProps = (state) => {
    const products = Object.values(state.finishGoods)
    const getManufaturingDate = selector(state, 'manufacturingDate')
    return { products: products, getManufaturingDate: getManufaturingDate };
}

export default connect(mapStateToProps, { fetchFinishGoods, createFinishGoodInventory })(formWrapped);