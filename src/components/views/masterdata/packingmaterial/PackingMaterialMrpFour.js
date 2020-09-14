import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createRawMaterial } from '../../../../actions';
import history from '../../../history';
import { Link } from 'react-router-dom';

class RawMaterialMrpFour extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
            </div>
        );
    }
    mrpFour = {
        bom: {
            selectionMethod: "", individual: "", componentScrap: "", requirementsGroup: "", depRequirements: ""
        },
        discontinuedParts: {
            discontinuedInd: "", effOut: "", followUpMaterial: ""
        }
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
        history.push("/packing-material-plant-data-one")
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create MRP 4</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>BOM Explosion/Dependent Requirements</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpFour.bom.selectionMethod" component={this.renderInput} placeholder="Selection Method" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.individual" component={this.renderInput} placeholder="Individual/Coll" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.componentScrap" component={this.renderInput} placeholder="Component Scrap(%)" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.requirementsGroup" component={this.renderInput} placeholder="Requirements Group" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.depRequirements" component={this.renderInput} placeholder="MRP Dep. Requirements" type="text" />
                            </div>
                        </div>
                        <h4>Discontinued Parts</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.discontinuedInd" component={this.renderInput} placeholder="Discontinued Ind." type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.effOut" component={this.renderInput} placeholder="Eff.-Out" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.followUpMaterial" component={this.renderInput} placeholder="Follow-up Material" type="text" />
                            </div>
                            
                        </div>
                        <div className="field">
                            <Link to={"/packing-material-mrp-three"} className="ui  button">Previous</Link>
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
    form: 'packingMaterialMrpFour'
})(RawMaterialMrpFour);
export default connect(mapStateToProps, { createRawMaterial })(formWrapped);