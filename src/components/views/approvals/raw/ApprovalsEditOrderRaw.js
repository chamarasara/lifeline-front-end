import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSuppliers, fetchRawMaterials, editPurchaseOrderRaw, fetchPurchaseOrderRaw } from '../../../../actions';

class ApprovalsEdirOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchSuppliers()
        this.props.fetchRawMaterials()
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id)
        console.log(this.props.order)
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
    renderRawMaterials() {
        return this.props.rawMaterials.map(rawMaterial => {
            return (
                <option key={rawMaterial._id} value={rawMaterial.id}>{rawMaterial.materialName}</option>
            )
        })
    }
    renderRawMaterialsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((rawMaterials, index) => <li key={index}>
                        <label htmlFor={rawMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${rawMaterials}.id`} type="text" required component="select" >
                                    <option>-Select Material-</option>
                                    {this.renderRawMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${rawMaterials}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${rawMaterials}.uom`} type="text" required component="select" placeholder="UOM" >
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
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Raw Material</button>

            </div>
        )
    }

    onSubmit = (formValues) => {
        //console.log(this.props.order.id)
        this.props.editPurchaseOrderRaw(this.props.order._id, formValues)
    }

    render() {
        if (!this.props.order) {
            return (
                <div>
                    Loading..............................................
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Edit Purchase Order RM</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="six wide field">
                            <Field name="supplierId" component="select" placeholder="" type="text" >
                                <option>-Select Supplier-</option>
                                {this.rendeSuppliers()}
                            </Field>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <label>Raw Materials- </label>
                                <FieldArray name="rawMaterials" component={this.renderRawMaterialsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/approvals-single-raw/${this.props.match.params.id}`} type="button" className="ui button">Back</Link>
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
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.match.params.id)
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    const order = state.purchaseOrdersRaw[ownProps.match.params.id]
    return {  suppliers: suppliers, rawMaterials: rawMaterials, order: order, packingMaterials: packingMaterials, initialValues: order };
}
const formWrapped = reduxForm({
    form: 'approvalsEdirOrderRaw',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(ApprovalsEdirOrderRaw);

export default connect(mapStateToProps, { fetchSuppliers, fetchRawMaterials, fetchPurchaseOrderRaw, editPurchaseOrderRaw })(formWrapped);