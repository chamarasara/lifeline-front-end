import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSuppliers } from '../../../../actions';
import { Link } from 'react-router-dom'

class NewRawMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
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
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
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


    render() {
        const { handleSubmit } = this.props

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Raw Material</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="eight wide field">
                                Materila Name <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialName" component={this.renderInput} placeholder="Material Name" type="text" />
                            </div>                          
                            <div className="four wide field">
                                Material Group <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialGroup" component={this.renderInput} placeholder="Material Group" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Unit of Measure <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="baseUnitMeasure" required component={this.renderSelectField} placeholder="" type="text" >
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
                            <div className="five wide field">
                            Old Material Number(Optional)
                                <Field name="oldMaterialNumber" component={this.renderInput} placeholder="Old Material Number" type="text" />
                            </div>                            
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Material State <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="materialState" component={this.renderSelectField} type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                            Description(optional)
                                <Field name="materialDescription" component="textarea" placeholder="Material Description(Optional)" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="eight wide field">
                                <label>Suppliers- </label>
                                <FieldArray name="suppliers" component={this.renderSupplierDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/raw-material"} className="ui button">Back</Link>
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
    if (!formValues.materialName) {
        errors.materialName = 'Required!';
    }    
    if (!formValues.materialGroup) {
        errors.materialGroup = 'Required!';
    }
    if (!formValues.baseUnitMeasure) {
        errors.baseUnitMeasure = 'Required!';
    }
    if (!formValues.email) {
        errors.email = 'Required!';
    }
    if (!formValues.materialState) {
        errors.materialState = 'Required!';
    }
    if (!formValues.baseUnitMeasure) {
        errors.baseUnitMeasure = 'Required!';
    }
    return errors;
}
const mapStateToProps = (state) => {
    const supplier = Object.values(state.supplier)
    return { supplier: supplier };
}
const formWrapped = reduxForm({
    form: 'newRawMaterial',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
    validate: validate
})(NewRawMaterial);
export default connect(mapStateToProps, { fetchSuppliers })(formWrapped);