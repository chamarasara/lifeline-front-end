import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createRawMaterial } from '../../../../actions';
import history from '../../../history';
import { Link } from 'react-router-dom';

class PackingMaterialPlantDataOne extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
            </div>
        );
    }
    plantDataOne = {
        generalData: {
            selectionMethod: "", individual: "", componentScrap: "", requirementsGroup: "", depRequirements: ""
        },
        shelfLifeData: {
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
        history.push("/packing-material-plant-data-two")
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Plant Data/Store One</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.baseUnit" component={this.renderInput} placeholder="Base Unit of Measure" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.unitOfIssue" component={this.renderInput} placeholder="Unit of Issue" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.tempConditions" component={this.renderInput} placeholder="Temp. Conditions" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.storageConditiions" component={this.renderInput} placeholder="Storage Conditions" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.containerRequirements" component={this.renderInput} placeholder="Container Requirements" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.hazMaterialNumber" component={this.renderInput} placeholder="Haz. Material Number" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.ccPhysInvInd" component={this.renderInput} placeholder="CC Phys.Inv.Ind" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.grSlips" component={this.renderInput} placeholder="Number of GR Slips" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.labelType" component={this.renderInput} placeholder="Label Type" type="text" />
                            </div>  
                            <div className="three wide field">
                                <Field name="plantDataOne.plantDataOne.labelFrom" component={this.renderInput} placeholder="Label From" type="text" />
                            </div>                          
                        </div>
                        <h4>Shelf Life Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.maxStoragePeriod" component={this.renderInput} placeholder="Max Storage Period" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.timeUnit" component={this.renderInput} placeholder="Time Unit" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.minRemainigShelfLife" component={this.renderInput} placeholder="Min Remaining Shelf Life" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.totalShelfLife" component={this.renderInput} placeholder="Total Shelf Life" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.periodForSled" component={this.renderInput} placeholder="Period Ind. for SLED" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.storagePercentage" component={this.renderInput} placeholder="Storage Percentage" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/packing-material-mrp-four"} className="ui  button">Previous</Link>
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
    form: 'packingMaterialPlantDataOne'
})(PackingMaterialPlantDataOne);
export default connect(mapStateToProps, { createRawMaterial })(formWrapped);