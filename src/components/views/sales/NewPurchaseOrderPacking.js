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
            </div>
        );
    }
    
    renderPackingMaterials() {
        return this.props.packingMaterials.map(packingMaterial => {
            return (
                <option key={packingMaterial._id} value={packingMaterial.id}>{packingMaterial.materialName}</option>
            )
        })
    }
    renderPackingMaterialsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((packingMaterials, index) => <li key={index}>
                        <label htmlFor={packingMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${packingMaterials}.id`} type="text" required component="select" >
                                    <option>-Select Material-</option>
                                    {this.renderPackingMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${packingMaterials}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${packingMaterials}.uom`} type="text" required component="select" placeholder="UOM" >
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
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Packing Material</button>

            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.createPurchaseOrderPacking(formValues)
    }

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Create Purchase Order PM</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="supplierId" component="select" placeholder="" type="text" >
                                <option>-Select Supplier-</option>
                                {this.rendeSuppliers()}
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
                </div>
            </div>
        )
    }
}
//Form input validation
// const validate = (formValues) => {
//     const errors = {}
//     if (!formValues.firstName) {
//         errors.firstName = 'Please enter First Name';
//     }
//     if (!formValues.lastName) {
//         errors.lastName = 'Please enter Last Name';
//     }
//     if (!formValues.address) {
//         errors.address = 'Please enter the Number of the Address';
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
const mapStateToProps = (state) => {
    console.log(state)
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    return { errorMessage: state, suppliers: suppliers, rawMaterials: rawMaterials, packingMaterials: packingMaterials };
}
const formWrapped = reduxForm({
    form: 'newPurchaseOrderRaw',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(NewPurchaseOrderRaw);

export default connect(mapStateToProps, { fetchSuppliers, fetchPackingMaterials, createPurchaseOrderPacking })(formWrapped);