import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class FinishGoodPlantDataOne extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
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
                                <Field name="plantDataOne.generalData.baseUnitPlant" component={this.renderInput} placeholder="Base Unit of Measure" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.unitOfIssue" component={this.renderInput} placeholder="Unit of Issue" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.tempConditions" component={this.renderInput} placeholder="Temp. Conditions" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.storageConditiions" component={this.renderInput} placeholder="Storage Conditions" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.containerRequirements" component={this.renderInput} placeholder="Container Requirements" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.hazMaterialNumber" component={this.renderInput} placeholder="Haz. Material Number" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.ccPhysInvInd" component={this.renderInput} placeholder="CC Phys.Inv.Ind" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.grSlips" component={this.renderInput} placeholder="Number of GR Slips" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.labelType" component={this.renderInput} placeholder="Label Type" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.labelFrom" component={this.renderInput} placeholder="Label From" type="text" />
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
const mapStateToProps = (state) => {
    //console.log(state)
    return { state: state };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(FinishGoodPlantDataOne);
export default connect(mapStateToProps, {  })(formWrapped);