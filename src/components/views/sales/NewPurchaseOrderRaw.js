import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSuppliers, fetchRawMaterials, createPurchaseOrderRaw } from '../../../actions';

class NewPurchaseOrder extends React.Component {

    componentDidMount() {
        this.props.fetchSuppliers()
        this.props.fetchRawMaterials()
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
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
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
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.createPurchaseOrderRaw(formValues)
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
                            <div className="eight wide field">
                                <Field name={`${rawMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderRawMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
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
                                <Field name={`${rawMaterials}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${rawMaterials}.unitPrice`} type="number" required component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                    <li>
                        <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Raw Material</button>
                        {submitFailed && error && <span style={{ color: "red" }}>{error}</span>}
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h3>Create Purchase Order RM</h3>
                        <form className="ui mini form error" onSubmit={handleSubmit(this.onSubmit)}>
                            <div className="six wide field">
                                <Field name="supplierId" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.rendeSuppliers()}
                                </Field>
                            </div>
                            <div className="six wide field">
                                Supplier Invoice (<span style={{ color: "red" }}> * </span> Pdf only, Max file size: 4Mb )
                                <Field name="supplierInvoice"  component={this.FileInput} placeholder="Supplier invoice" type="file" >
                                </Field>
                            </div>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    <label>Raw Materials- </label>
                                    <FieldArray name="rawMaterials" component={this.renderRawMaterialsDropDown} />
                                </div>
                            </div>
                            <div className="field">
                                <Link to={"/purchase-order-dashboard-raw"} type="button" className="ui button">Back</Link>
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
    //console.log(formValues.supplierInvoice)

    const errors = {}
    if (!formValues.supplierId) {
        errors.supplierId = 'Required';
    }
    if (!formValues.supplierInvoice) {
        errors.supplierInvoice = 'Required';
    }
    if (!formValues.rawMaterials || !formValues.rawMaterials.length) {
        errors.rawMaterials = { _error: 'At least one material should be add' }
    } else {
        const rawMaterialsArrayErrors = []
        formValues.rawMaterials.forEach((rawMaterials, index) => {
            const productErrors = {}
            if (!rawMaterials || !rawMaterials.id) {
                productErrors.id = 'Required'
                rawMaterialsArrayErrors[index] = productErrors
            }
            if (!rawMaterials || !rawMaterials.quantity) {
                productErrors.quantity = 'Required'
                rawMaterialsArrayErrors[index] = productErrors
            }
            if (!rawMaterials || !rawMaterials.uom) {
                productErrors.uom = 'Required'
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
    form: 'newPurchaseOrderRm',
    validate: validate
})(NewPurchaseOrder);

const mapStateToProps = (state) => {
    console.log(state)
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const purchaseOrders = Object.values(state.purchaseOrdersRaw)
    return { errorMessage: state, suppliers: suppliers, rawMaterials: rawMaterials, purchaseOrders: purchaseOrders };
}

export default connect(mapStateToProps, { fetchSuppliers, fetchRawMaterials, createPurchaseOrderRaw })(formWrapped);