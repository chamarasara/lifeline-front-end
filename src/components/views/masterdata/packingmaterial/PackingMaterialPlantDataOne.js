import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class PackingMaterialPlantDataOne extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
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
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Plant Data/Store One</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                Unit of Issue <span style={{ color: "red", fontSize: "18px" }}>*</span>
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
                                Temp Conditions <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.generalData.tempConditions" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Temp Condition-</option>
                                    <option value="Room Temp">Room Temp</option>
                                    <option value="Cold Room (-5)">Cold Room (-5)</option>
                                    <option value="Refrigrator (+5)">Refrigrator (+5)</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Storage Condition <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.generalData.storageConditions" component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Storage Condition-</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Ventilagetd Env">Ventilagetd Env</option>
                                    <option value="Controlled Env">Controlled Env</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Container Requirements <span style={{ color: "red", fontSize: "18px" }}>*</span>
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
                            Haz Material Number (Optional)
                                <Field name="plantDataOne.generalData.hazMaterialNumber" component={this.renderInput} placeholder="Haz. Material Number" type="text" />
                            </div>
                        </div>
                        <h4>Shelf Life Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                Max Storage Period <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.maxStoragePeriod" component={this.renderInput} placeholder="Max Storage Period" type="number" />
                            </div>
                            <div className="two wide field">
                                Time Unit <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.timeUnit" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Time-Unit-</option>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                Min Shelf Life <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.minRemainigShelfLife" component={this.renderInput} placeholder="Min Remaining Shelf Life" type="text" />
                            </div>
                            <div className="two wide field">
                                Total Shelf Life <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.totalShelfLife" component={this.renderInput} placeholder="Total Shelf Life" type="text" />
                            </div>
                            <div className="three wide field">
                                Period fro Sled <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.periodForSled" component={this.renderInput} placeholder="Period Ind. for SLED" type="text" />
                            </div>
                            <div className="two wide field">
                                Storage Percentage <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="plantDataOne.shelfLifeData.storagePercentage" component={this.renderInput} placeholder="Storage Percentage" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
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
    console.log(!formValues.plantDataOne)
    if (!formValues.plantDataOne) {
        errors.plantDataOne = {
            generalData: {
                unitOfIssue: "Required", tempConditions: "Required", storageConditions: "Required",
                containerRequirements: "Required", ccPhysInvInd: "Required", grSlips: "Required", labelType: "Required", labelFrom: "Required"
            }
        };
    }
    // if (!formValues.plantDataOne) {
    //     errors.plantDataOne = { weight: { grossWeight: "Required", weightUnit: "Required", netWeight: "Required", volume: "Required", volumeUnit: "Required", dimensions: "Required" } };
    // }
    return errors;
}
const mapStateToProps = (state) => {
    //console.log(state)
    return { state: state };
}
const formWrapped = reduxForm({
    form: 'newPackingMaterial',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate: validate
})(PackingMaterialPlantDataOne);
export default connect(mapStateToProps, {})(formWrapped);