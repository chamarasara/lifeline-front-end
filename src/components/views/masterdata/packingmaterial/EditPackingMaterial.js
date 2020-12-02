import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSuppliers, fetchPackingMaterial, editPackingMaterial } from '../../../../actions';



class EditPackingMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
        this.props.fetchPackingMaterial(this.props.match.params.id)

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

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
    }

    renderSuppliers() {
        return this.props.supplier.map(supplier => {
            return (
                <option key={supplier.id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    renderSupplierDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((suppliers, index) => <li key={index}>
                        <label htmlFor={suppliers}>Supplier #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${suppliers}.id`} type="text" component="select" >
                                    <option>-Select Supplier-</option>
                                    {this.renderSuppliers()}
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Suppliers</button>

            </div>
        )
    }
    onSubmit = (formValues) => {
        this.props.editPackingMaterial(this.props.material._id, formValues)
        console.log(formValues)
    }
    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <h4>Please select a Packing Material</h4>
                    </div>
                </div>
            )
        }

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Basic Details</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                Material Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialName" component={this.renderInput} placeholder="Material Name" type="text" />
                            </div>
                            <div className="four wide field">
                                Material Code<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialCode" component={this.renderInput} placeholder="Material Code" type="text" />
                            </div>
                            <div className="four wide field">
                                Material Group <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialGroup" component={this.renderInput} placeholder="Material Group" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Base Unit of Measure<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="baseUnitMeasure" required component="select" placeholder="" type="text" >
                                    <option>-Unit of Measure-</option>
                                    <option value="Each">Each</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="m">m</option>
                                    <option value="ml">ml</option>
                                    <option value="g">g</option>
                                    <option value="cm">cm</option>
                                </Field>
                            </div>
                            <div className="five wide field">
                                Old Material Number
                                <Field name="oldMaterialNumber" component={this.renderInput} placeholder={this.props.material.oldMaterialNumber} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Material Status<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Material Description
                                <Field name="materialDescription" component="textarea" placeholder="Material Description(Optional)" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="five wide field">
                                <label>Suppliers- </label>
                                <FieldArray name="suppliers" component={this.renderSupplierDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/single-packing-material/${this.props.material.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    const supplier = Object.values(state.supplier)
    return { supplier: supplier, material: state.packingMaterials[ownPorps.match.params.id], initialValues: state.packingMaterials[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editPackingMaterial',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(EditPackingMaterial);
export default connect(mapStateToProps, { fetchSuppliers, fetchPackingMaterial, editPackingMaterial })(formWrapped);