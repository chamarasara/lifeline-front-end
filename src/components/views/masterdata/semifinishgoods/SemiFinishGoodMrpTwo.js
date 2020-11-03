import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class SemiFinishGoodMrpTwo extends React.Component {

    renderError = ({ meta: { touched, error } }) =>
        touched && error ? <span>{error}</span> : false

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}  type={type} autoComplete="off" />
            </div>
        );
    }
    mrpTwo = {
        procurement: {
            baseUnit: "", mrpGroup: "", purchasingGroup: "", abcIndicator: "", plantMaterialStatus: "", validFrom: ""
        },
        scheduling: {
            mrpType: "", reOrderPoint: "", planningTimeFence: "", planningCycle: "", mrpController: ""
        },
        netRequirements: {
            lotSize: "", minimumLotSize: "", maximumLotSize: "", talkTime: "", roundingProfile: "", roundingValue: "", unitOfMeasureGroup: ""
        }
    }
  
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create MRP 2</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <h4>Procurement</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.procurementType" component={this.renderInput} placeholder="Procurement Type" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.batchEntry" component={this.renderInput} placeholder="Batch Entry" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.productStoreLocation" component={this.renderInput} placeholder="Product Store Location" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.quotaUsage" component={this.renderInput} placeholder="Quota arr. Usage" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.supplyArea" component={this.renderInput} placeholder="Default Supply Area" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.backFlush" component={this.renderInput} placeholder="Backflush" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.storageLocation" component={this.renderInput} placeholder="Storage Location for EP" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.jitDelivery" component={this.renderInput} placeholder="JIT delivery Schedule" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.stockgroup" component={this.renderInput} placeholder="Stock det. Gropup" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <label htmlFor="Co-Product">Co-Product</label>
                            </div> 
                            <div className="two wide field">
                                <Field name="mrpTwo.procurement.coProduct" component={this.renderInput} label="" placeholder="" type="checkbox" />
                            </div>
                            <div className="two wide field">
                                <label htmlFor="BulkMaterial">Bulk Material</label>
                            </div>
                            <div className="two wide field">
                                <Field name="mrpTwo.procurement.bulkMaterial" component={this.renderInput} label="" placeholder="" type="checkbox" />
                            </div>
                        </div>
                        <h4>Scheduling</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.inHouseProduction" component={this.renderInput} placeholder="In-house Production(days)" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.plannedDeliveryTime" component={this.renderInput} placeholder="Planned Delivery Time(days)" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.grProcessingTime" component={this.renderInput} placeholder="GR Processing Time(days)" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.planningCalender" component={this.renderInput} placeholder="Planning Calender" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.schedulingMarginKey" component={this.renderInput} placeholder="Schedule Margin Key" type="text" />
                            </div>
                        </div>
                        <h4>Net Requirements Calculation</h4>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.safetyStock" component={this.renderInput} placeholder="Safety Stock" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.netRequirements.minSafetyStock" component={this.renderInput} placeholder="Min Safety Stock" type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.serviceLevel" component={this.renderInput} placeholder="Service Level(%)" type="number" />
                            </div>                            
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.coverageProfile" component={this.renderInput} placeholder="Coverage Profile" type="text" />
                            </div>
                            
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.safetyTimeInd" component={this.renderInput} placeholder="Safety Time ind" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.netRequirements.safetyTime" component={this.renderInput} placeholder="Safety Time/act.cov(days)" type="number" />
                            </div>
                        </div>

                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>Back</button>
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
    form: 'newSemiFinishGood',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SemiFinishGoodMrpTwo);
export default connect(mapStateToProps, {  })(formWrapped);