import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchFinishGoodsInventory, fetchRawMaterials, fetchSuppliers } from '../../../../actions';

class SearchRawMaterialInventory extends React.Component {
    componentDidMount() {
        this.props.fetchRawMaterials()
        this.props.fetchSuppliers()
    }
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        //this.props.searchFinishGoodsInventory(formValues)
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
    renderRawMaterials() {
        return this.props.rawMaterials.map(material => {
            return (
                <option key={material._id} value={material.id}>{material.materialName}</option>
            )
        })
    }
    renderSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    render() {
        return (
            <div className="search-bar">
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="seven wide field">
                            Material name 
                            <Field name="materialId" type="text" required component={this.renderSelectField} >
                                <option>-Select Material-</option>
                                {this.renderRawMaterials()}
                            </Field>                            
                        </div>
                        <div className="seven wide field">
                            Supplier name 
                            <Field name="supplierId" type="text" required component={this.renderSelectField} >
                                <option>-Select Supplier-</option>
                                {this.renderSuppliers()}
                            </Field>                            
                        </div>
                        <div className="four wide field">
                            PO: Number 
                            <Field name="purchaseOrder" type="text" required component={this.renderInput} />
                        </div>
                        <div className="four wide field">
                            Invoice Number
                            <Field name="invoiceNumber" type="text" required component={this.renderInput} />
                        </div>
                        <div className="six field">
                            <Field name="startDate" component={this.renderInput} label="Start Date" placeholder="Start Date" type="date" />
                        </div>
                        <div className="six field">
                            <Field name="endtDate" component={this.renderInput} label="Start Date" placeholder="Start Date" type="date" />
                        </div>
                    </div>
                    <button type="submit" className="ui primary mini button">Search</button>
                    <button onClick={this.onClick} className="ui red mini button">Clear</button>
                </form>
            </div>
        );
    };
};
const validate = (formvalues) => {
    const errors = {}
    if (!formvalues.searchText) {
        errors.searchText = 'Select a Product Name';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'searchRawMaterialInventory',
    validate: validate
})(SearchRawMaterialInventory);

const mapStateToProps = (state) => {
    console.log(state);
    const rawMaterials = Object.values(state.rawMaterials)
    const suppliers = Object.values(state.supplier)
    return { rawMaterials: rawMaterials, suppliers };
}
export default connect(mapStateToProps, { searchFinishGoodsInventory, fetchRawMaterials, fetchSuppliers })(formWrapped);


