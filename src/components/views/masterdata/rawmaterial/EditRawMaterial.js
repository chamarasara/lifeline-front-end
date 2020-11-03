import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSuppliers, fetchRawMaterial, editRawMaterial } from '../../../../actions';



class EditRawMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
        this.props.fetchRawMaterial(this.props.match.params.id)

    }

    suppliers = {
        supplier1: "",
        supplier2: "",
        supplier3: "",
        supplier4: "",
        supplier5: "",
        supplier6: "",
        supplier7: "",
        supplier8: "",
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
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
            </div>
        );
    }

    renderSuppliers() {
        return this.props.supplier.map(supplier => {
            return (
                <option key={supplier.id} value={supplier.id}>{supplier.supplierName}</option>
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
                                <Field name={suppliers} type="text" component="select" >
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
        this.props.editRawMaterial(this.props.match.params.id, formValues)
        console.log(formValues)
    }  
    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <h4>Please select a Raw Material</h4>
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
                                <Field name="materialName" component={this.renderInput} placeholder={this.props.material.materialName} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialCode" component={this.renderInput} placeholder={this.props.material.materialCode} type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialGroup" component={this.renderInput} placeholder={this.props.material.materialGroup} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="baseUnitMeasure" component={this.renderInput} placeholder={this.props.material.baseUnitMeasure} type="text" />
                            </div>
                            <div className="five wide field">
                                <Field name="oldMaterialNumber" component={this.renderInput} placeholder={this.props.material.oldMaterialNumber} type="text" />
                            </div>
                            <div className="seven wide field">
                                <Field name="division" component={this.renderInput} placeholder={this.props.material.division} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>

                        <div className="fields">
                            <div className="five wide field">
                                <label>Suppliers- </label>
                                <FieldArray name="suppliers" component={this.renderSupplierDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/single-raw-material/${this.props.material._id}`} className="ui button">Back</Link>
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
    return { supplier: supplier, material: state.rawMaterials[ownPorps.match.params.id], initialValues: state.rawMaterials[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editRawMaterial',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(EditRawMaterial);
export default connect(mapStateToProps, { fetchSuppliers, fetchRawMaterial, editRawMaterial })(formWrapped);