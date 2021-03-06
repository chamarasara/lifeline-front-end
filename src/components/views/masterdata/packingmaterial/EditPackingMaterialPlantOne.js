import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPackingMaterial, editPackingMaterial } from '../../../../actions';


class EditPackingMaterialPlantOne extends React.Component {
    componentDidMount() {
        this.props.fetchPackingMaterial(this.props.match.params.id)
    }

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
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
            </div>
        </div>
    )
    onSubmit = (formValues) => {
        this.props.editPackingMaterial(this.props.material._id, formValues)
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
                    <h3>Edit Plant Data/Store One</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                Unit of Issue
                                <Field name="plantDataOne.generalData.unitOfIssue" required component="select" placeholder="" type="text" >
                                    <option>-Unit of Issue-</option>
                                    <option value="Each">Each</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="m">m</option>
                                    <option value="ml">ml</option>
                                    <option value="g">g</option>
                                    <option value="cm">cm</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Temp Conditions
                                <Field name="plantDataOne.generalData.tempConditions" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Temp Condition-</option>
                                    <option value="Room Temp">Room Temp</option>
                                    <option value="Cold Room (-5)">Cold Room (-5)</option>
                                    <option value="Refrigrator (+5)">Refrigrator (+5)</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Storage Conditions
                                <Field name="plantDataOne.generalData.storageConditions" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Storage Condition-</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Ventilagetd Env">Ventilagetd Env</option>
                                    <option value="Controlled Env">Controlled Env</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Container Requirements
                                <Field name="plantDataOne.generalData.containerRequirements" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Container Requirements-</option>
                                    <option value="Stainless Steel">Stainless Steel</option>
                                    <option value="Mild Steel">Mild Steel</option>
                                    <option value="HDPE">HDPE</option>
                                    <option value="Wood">Wood</option>
                                    <option value="No Specific">No Specific</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                Haz Material Number
                                <Field name="plantDataOne.generalData.hazMaterialNumber" component={this.renderInput} placeholder="Haz. Material Number" type="text" />
                            </div>
                        </div>
                        <h4>Shelf Life Data</h4>
                        <div className="fields">
                            <div className="two wide field">
                                Time Unit
                                <Field name="plantDataOne.shelfLifeData.timeUnit" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Time-Unit-</option>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                Max Storage Period
                                <Field name="plantDataOne.shelfLifeData.maxStoragePeriod" component={this.renderInput} placeholder="Max Storage Period" type="text" />
                            </div>                            
                            <div className="three wide field">
                                Min Remaining Shelf Life
                                <Field name="plantDataOne.shelfLifeData.minRemainigShelfLife" component={this.renderInput} placeholder="Min Remaining Shelf Life" type="text" />
                            </div>
                            <div className="two wide field">
                                Total Shelf Life
                                <Field name="plantDataOne.shelfLifeData.totalShelfLife" component={this.renderInput} placeholder="Total Shelf Life" type="text" />
                            </div>
                            <div className="three wide field">
                                Period for Sled
                                <Field name="plantDataOne.shelfLifeData.periodForSled" component={this.renderInput} placeholder="Period Ind. for SLED" type="text" />
                            </div>
                            <div className="two wide field">
                                Storage Precentage
                                <Field name="plantDataOne.shelfLifeData.storagePercentage" component={this.renderInput} placeholder="Storage Percentage" type="text" />
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
    return { material: state.packingMaterials[ownPorps.match.params.id], initialValues: state.packingMaterials[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editPackingMaterialPlantOne'
})(EditPackingMaterialPlantOne);
export default connect(mapStateToProps, { fetchPackingMaterial, editPackingMaterial })(formWrapped);