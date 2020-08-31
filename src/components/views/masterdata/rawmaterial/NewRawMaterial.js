import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSuppliers, createRawMaterial } from '../../../../actions';

class NewRawMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchSuppliers()
    }

    suppliers = {
        supplierOne: "",
        supplierTwo: "",
        supplierThree: "",
        supplierFour: "",
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
        const suppliers = [];
        suppliers.push({id:formValues.suppliers.supplierOne}, {id:formValues.suppliers.supplierTwo}, {id:formValues.suppliers.supplierThree}, {id:formValues.suppliers.supplierFour})
        console.log(suppliers)
        delete formValues.suppliers;
        const values = {...formValues, suppliers}
        //delete formValues.suppliers;
        console.log(values)
        this.props.createRawMaterial(values)
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
                    <h5>Create New Raw Material</h5>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="twelve wide field">
                                <Field name="materialName" component={this.renderInput} placeholder="Material Name" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialCode" component={this.renderInput} placeholder="Material ID" type="text" />
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
                            <button type="submit" className="ui primary button">Add New Material</button>
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
    form: 'newRawMaterial'
})(NewRawMaterial);
export default connect(mapStateToProps, { fetchSuppliers, createRawMaterial })(formWrapped);