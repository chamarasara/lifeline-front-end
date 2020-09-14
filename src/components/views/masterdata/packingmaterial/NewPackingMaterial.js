import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSuppliers, createRawMaterial } from '../../../../actions';
import history from '../../../history';

class NewPackingMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
    }

    suppliers = {
        supplierOne: null,
        supplierTwo: null,
        supplierThree: null,
        supplierFour: null,
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
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        // const suppliers = [];
        // suppliers.push({ id: parseInt(formValues.suppliers.supplierOne) }, { id: parseInt(formValues.suppliers.supplierTwo) }, { id: parseInt(formValues.suppliers.supplierThree) }, { id: parseInt(formValues.suppliers.supplierFour)})
        // console.log(suppliers)      
        // const values = {...formValues, suppliers}
        // //delete formValues.suppliers;
        // console.log(values)
        //this.props.createRawMaterial(values)
        history.push("/packing-material-mrp-one")
    }
    renderSuppliers() {
        return this.props.supplier.map(supplier => {
            return (
                <option key={supplier.id} value={supplier.id}>{supplier.supplierName}</option>
            )
        })
    }
    render() {

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Packing Material</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name="materialName" component={this.renderInput} placeholder="Material Name" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialCode" component={this.renderInput} placeholder="Material Code" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialGroup" component={this.renderInput} placeholder="Material Group" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="baseUnitMeasure" component={this.renderInput} placeholder="Base Unit Measure" type="text" />
                            </div>
                            <div className="five wide field">
                                <Field name="oldMaterialNumber" component={this.renderInput} placeholder="Old Material Number" type="text" />
                            </div>
                            <div className="seven wide field">
                                <Field name="division" component={this.renderInput} placeholder="Division" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="desabled">Desabled</option>
                                </Field>
                            </div>                            
                        </div>                        
                        <div className="fields">
                            <div className="five wide field">
                                <label>Suppliers- </label>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="suppliers.supplierOne" component="select" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.renderSuppliers()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name="suppliers.supplierTwo" component="select" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.renderSuppliers()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name="suppliers.supplierThree" component="select" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.renderSuppliers()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name="suppliers.supplierFour" component="select" type="text" >
                                    <option>-Select Supplier-</option>
                                    {this.renderSuppliers()}
                                </Field>
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const supplier = Object.values(state.supplier)
    console.log(supplier)
    return { supplier: supplier };
}
const formWrapped = reduxForm({
    form: 'newPackingMaterial'
})(NewPackingMaterial);
export default connect(mapStateToProps, { fetchSuppliers, createRawMaterial })(formWrapped);