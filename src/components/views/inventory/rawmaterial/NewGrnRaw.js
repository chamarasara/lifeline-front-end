import React from 'react';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import moment from 'moment'
import { connect } from 'react-redux';
import { fetchPurchaseOrderRaw, fetchPurchaseOrdersRaw, printPurchaseOrderRaw, fetchSuppliers, fetchRawMaterials, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw } from '../../../../actions';
import { Link } from 'react-router-dom'

class NewGrnRaw extends React.Component {
    componentDidMount() {
        this.props.fetchGrnByPurchaseOrder(this.props.match.params.id)
        this.props.fetchPurchaseOrdersRaw()
        this.props.fetchSuppliers()
        this.props.fetchRawMaterials()
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
    renderPurchaseOrders() {
        return this.props.purchaseOrders.map(order => {
            if (order.order_state === "Approved") {
                return (
                    <option key={order._id} value={order.id}>{order.orderNumber}</option>
                )
            }

        })
    }
    renderSuccessMessage() {
        if (this.props.grn[0] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    renderRawMaterials() {
        return this.props.rawMaterials.map(rawMaterial => {
            return (
                <option key={rawMaterial._id} value={rawMaterial.id}>{rawMaterial.materialName}</option>
            )
        })
    }
    renderRawMaterialsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((rawMaterials, index) => <li key={index}>
                        <label htmlFor={rawMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field disabled">
                                Material Name
                                <Field name={`${rawMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderRawMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field disabled">
                                Unit Of Measure
                                <Field name={`${rawMaterials}.uom`} type="text" required component={this.renderSelectField} placeholder="UOM" >
                                    <option>-UOM-</option>
                                    <option value="Each">Each</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="m">m</option>
                                    <option value="ml">ml</option>
                                    <option value="g">g</option>
                                    <option value="cm">cm</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Quantity
                                <Field name={`${rawMaterials}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                Unit Price
                                <Field name={`${rawMaterials}.unitPrice`} type="number" required component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
    test(){
        window.alert("test")
    }
    rederGrn() {

        return (
            <div>
                <div>
                    <h4>Create new GRN</h4>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="five wide field">
                                Select Purchase Order
                                <Field name="selectPurchaseOrderNumber" type="text" onChange={() => window.alert("test")} required component={this.renderSelectField} placeholder="Purchase Order" >
                                    <option>-PO Number-</option>
                                    {this.renderPurchaseOrders()}
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                Supplier Invoice Number
                                <Field name="invoiceNumber" type="text" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                            <div className="four wide field">
                                Invoice Date
                                <Field name="invoiceDate" type="date" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <FieldArray name="rawMaterials" component={this.renderRawMaterialsDropDown} />
                            </div>
                        </div>
                        
                        <div className="field">
                            <Link to={"/raw-material-inventory-dashboard"} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                    {this.renderSuccessMessage()}
                </div>
            </div>
        )

    }


    onSubmit = (formValues) => {

        for (let i = 0; i < formValues.rawMaterials.length; i++) {
            formValues.rawMaterials[i].date = moment().format('DD/MM/YYYY, h:mm:ss a');
            formValues.rawMaterials[i].remainingQuantity = formValues.rawMaterials[i].quantity
            formValues.rawMaterials[i].supplierId = formValues.supplierId
            formValues.rawMaterials[i].purchaseOrderId = formValues.id
            formValues.rawMaterials[i].purchaseOrderNumber = formValues.orderNumber
            formValues.rawMaterials[i].invoiceNumber = formValues.invoiceNumber
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].supplierId = formValues.supplierId
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
        }
        console.log(formValues)
        this.props.createNewGrn(formValues)
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    {this.rederGrn()}
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.invoiceNumber) {
        errors.invoiceNumber = 'Please Enter Supplier Invoice Number';
    } 
    if (!formValues.selectPurchaseOrderNumber) {
        errors.selectPurchaseOrderNumber = 'Please Enter Purchase Order';
    }
    if (!formValues.invoiceDate) {
        errors.invoiceDate = 'Please Enter Invoice Date';
    }
    if (!formValues.rawMaterials || !formValues.rawMaterials.length) {
        errors.rawMaterials = { _error: 'At least one material must be entered' }
    } else {
        const rawMaterialsArrayErrors = []
        formValues.rawMaterials.forEach((rawMaterials, index) => {
            const productErrors = {}
            if (!rawMaterials || !rawMaterials.quantity) {
                productErrors.quantity = 'Required, Minimum Value "0"'
                rawMaterialsArrayErrors[index] = productErrors
            }
            if (!rawMaterials || !rawMaterials.unitPrice) {
                productErrors.unitPrice = 'Required'
                rawMaterialsArrayErrors[index] = productErrors
            }
        })
        if (rawMaterialsArrayErrors.length) {
            errors.rawMaterials = rawMaterialsArrayErrors
        }
    }
    return errors;
}

const formWrapped = reduxForm({
    form: 'purchaseOrderRawGrn',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(NewGrnRaw);

const selector = formValueSelector('purchaseOrderRawGrn')

const mapStateToProps = (state, ownPorps) => {
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const purchaseOrders = Object.values(state.purchaseOrdersRaw)
    const poNumber = selector(state, 'selectPurchaseOrderNumber')
    const order = state.purchaseOrdersRaw[poNumber]
    const grn = Object.values(state.rawMaterialGrn)
    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        order: order,
        initialValues: order,
        grn: grn,
        purchaseOrders: purchaseOrders,
        poNumber: poNumber
    };
}

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, fetchPurchaseOrdersRaw, printPurchaseOrderRaw, fetchSuppliers, fetchRawMaterials, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw })(formWrapped);