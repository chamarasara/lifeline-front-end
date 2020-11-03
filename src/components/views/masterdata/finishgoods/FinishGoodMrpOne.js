import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class FinishGoodMrpOne extends React.Component{

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
    mrpOne={
        generalData:{
            baseUnit: "", mrpGroup: "", purchasingGroup: "", abcIndicator: "", plantMaterialStatus: "", validFrom: ""
        },
        mrpProcedure:{
            mrpType: "", reOrderPoint: "", planningTimeFence: "", planningCycle: "", mrpController: ""
        },
        lotSizeData:{
            lotSize: "", minimumLotSize: "", maximumLotSize: "", talkTime: "", roundingProfile: "", roundingValue: "", unitOfMeasureGroup: ""
        }
    }
   
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create MRP 1</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                    <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.baseUnit" component={this.renderInput} placeholder="Base Unit of Measure" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.mrpGroup" component={this.renderInput} placeholder="MRP Group" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.purchasingGroup" component={this.renderInput} placeholder="Purchasing Group" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.abcIndicator" component={this.renderInput} placeholder="ABC Indicatior" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.plantMaterialStatus" component={this.renderInput} placeholder="Plant-sp Material Status" type="text" />
                            </div>                                                       
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.validFrom" component={this.renderInput} placeholder="Valid from" label="Valid from" type="date" />
                            </div> 
                        </div>
                        <h4>MRP Procedure</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.mrpType" component={this.renderInput} placeholder="MRP Type" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.reOrderPoint" component={this.renderInput} placeholder="Reorder Point" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.planningTimeFence" component={this.renderInput} placeholder="Planning Time Fence" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.planningCycle" component={this.renderInput} placeholder="Planning Cycle" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.mrpController" component={this.renderInput} placeholder="MRP Controller" type="text" />
                            </div>
                        </div>
                        <h4>Lot Size Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.lotSize" component={this.renderInput} placeholder="Lot Size" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.minimumLotSize" component={this.renderInput} placeholder="Minimum Lot Size" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.maximumLotSize" component={this.renderInput} placeholder="Maximum Lot Size" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.maximumStockLevel" component={this.renderInput} placeholder="Maximum Stock Level" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.talkTime" component={this.renderInput} placeholder="Talk Time" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.roundingProfile" component={this.renderInput} placeholder="Rounding Profile" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.roundingValue" component={this.renderInput} placeholder="Rounding Value" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.unitOfMeasureGroup" component={this.renderInput} placeholder="Unit of Measure Group" type="text" />
                            </div>                            
                        </div>

                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>Previous</button>
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
})(FinishGoodMrpOne);
export default connect(mapStateToProps, { })(formWrapped);