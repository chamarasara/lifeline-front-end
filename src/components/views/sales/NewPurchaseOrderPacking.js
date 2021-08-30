import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSuppliers, fetchPackingMaterials, createPurchaseOrderPacking } from '../../../actions';

class NewPurchaseOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchSuppliers()
        this.props.fetchPackingMaterials()
    }
    adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

    FileInput = ({
        input: { value: omitValue, onChange, onBlur, ...inputProps },
        meta: omitMeta,
        ...props
    }) => {
        return (
            <input
                onChange={this.adaptFileEventToValue(onChange)}
                onBlur={this.adaptFileEventToValue(onBlur)}
                type="file"
                {...props.input}
                {...props}
            />
        );
        
    };
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
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
    renderPackingMaterials() {
        return this.props.packingMaterials.map(packingMaterial => {
            return (
                <option key={packingMaterial._id} value={packingMaterial.id}>{packingMaterial.materialName}</option>
            )
        })
    }

    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createPurchaseOrderPacking(formValues)
    }
    renderSuccessMessage() {
        if (this.props.purchaseOrders[0] === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    renderPackingMaterialsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((packingMaterials, index) => <li key={index}>
                        <label htmlFor={packingMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${packingMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderPackingMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${packingMaterials}.uom`} type="text" required component={this.renderSelectField} placeholder="UOM" >
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
                                <Field name={`${packingMaterials}.quantity`} type="number" component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${packingMaterials}.unitPrice`} type="number" component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Packing Material</button>
                {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
            </div>
        )
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h3>Create Purchase Order PM</h3>
                        <form className="ui mini form error" onSubmit={handleSubmit(this.onSubmit)}>
                            <div className="six wide field">
                                <Field name="supplierId" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.rendeSuppliers()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                Supplier Invoice (<span style={{ color: "red" }}> * </span> Pdf only, Max file size: 4Mb )
                                <Field name="supplierInvoice" component={this.FileInput} placeholder="Supplier invoice" type="file" >
                                </Field>
                            </div>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    <label>Packing Material- </label>
                                    <FieldArray name="packingMaterials" component={this.renderPackingMaterialsDropDown} />
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/purchase-order-dashboard-packing"} type="button" className="ui button">Back</Link>
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
    if (!formValues.supplierId) {
        errors.supplierId = 'Required';
    }
    if (!formValues.supplierInvoice) {
        errors.supplierInvoice = 'Required';
    }
    if (!formValues.packingMaterials || !formValues.packingMaterials.length) {
        errors.packingMaterials = { _error: 'At least one material should be add' }
    } else {
        const packingMaterialsArrayErrors = []
        formValues.packingMaterials.forEach((packingMaterials, index) => {
            const productErrors = {}
            if (!packingMaterials || !packingMaterials.id) {
                productErrors.id = 'Required'
                packingMaterialsArrayErrors[index] = productErrors
            }
            if (!packingMaterials || !packingMaterials.quantity) {
                productErrors.quantity = 'Required'
                packingMaterialsArrayErrors[index] = productErrors
            }
            if (!packingMaterials || !packingMaterials.uom) {
                productErrors.uom = 'Required'
                packingMaterialsArrayErrors[index] = productErrors
            }
            if (!packingMaterials || !packingMaterials.unitPrice) {
                productErrors.unitPrice = 'Required'
                packingMaterialsArrayErrors[index] = productErrors
            }
        })
        if (packingMaterialsArrayErrors.length) {
            errors.packingMaterials = packingMaterialsArrayErrors
        }
    }
    return errors;
}
const mapStateToProps = (state) => {
    console.log(state)
    const suppliers = Object.values(state.supplier)
    const packingMaterials = Object.values(state.packingMaterials)
    const purchaseOrders = Object.values(state.purchaseOrdersPacking)
    console.log(purchaseOrders)
    return { errorMessage: state, suppliers: suppliers, packingMaterials: packingMaterials, purchaseOrders: purchaseOrders };
}
const formWrapped = reduxForm({
    form: 'newPurchaseOrderRaw',
    validate: validate
})(NewPurchaseOrderRaw);

export default connect(mapStateToProps, { fetchSuppliers, fetchPackingMaterials, createPurchaseOrderPacking })(formWrapped);