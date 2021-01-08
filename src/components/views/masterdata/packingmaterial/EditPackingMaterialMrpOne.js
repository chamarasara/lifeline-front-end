import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchPackingMaterial, editPackingMaterial } from '../../../../actions';


class EditPackingMaterialMrpOne extends React.Component {
    componentDidMount() {
        this.props.fetchPackingMaterial(this.props.match.params.id)

    }
    renderError = ({ meta: { touched, error } }) =>
        touched && error ? <span>{error}</span> : false

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        this.props.editPackingMaterial(this.props.match.params.id, formValues)
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
                    <h3>Edit MRP 1</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.baseUnit" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.baseUnit} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.mrpGroup" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.mrpGroup} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.purchasingGroup" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.purchasingGroup} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.abcIndicator" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.abcIndicator} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.plantMaterialStatus" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.plantMaterialStatus} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.generalData.validFrom" component={this.renderInput} placeholder={this.props.material.mrpOne.generalData.validFrom} label="Valid from" type="date" />
                            </div>
                        </div>
                        <h4>MRP Procedure</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.mrpType" component={this.renderInput} placeholder={this.props.material.mrpOne.mrpProcedure.mrpType} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.reOrderPoint" component={this.renderInput} placeholder={this.props.material.mrpOne.mrpProcedure.reOrderPoint} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.planningTimeFence" component={this.renderInput} placeholder={this.props.material.mrpOne.mrpProcedure.planningTimeFence} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.planningCycle" component={this.renderInput} placeholder={this.props.material.mrpOne.mrpProcedure.planningCycle} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.mrpProcedure.mrpController" component={this.renderInput} placeholder={this.props.material.mrpOne.mrpProcedure.mrpController} type="text" />
                            </div>
                        </div>
                        <h4>Lot Size Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.lotSize" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.lotSize} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.minimumLotSize" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.minimumLotSize} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.maximumLotSize" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.maximumLotSize} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.maximumStockLevel" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.maximumStockLevel} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.talkTime" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.talkTime} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.roundingProfile" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.roundingProfile} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.roundingValue" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.roundingValue} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpOne.lotSizeData.unitOfMeasureGroup" component={this.renderInput} placeholder={this.props.material.mrpOne.lotSizeData.unitOfMeasureGroup} type="text" />
                            </div>
                        </div>

                        <div className="field">
                            <Link to={`/single-packing-material/${this.props.material._id}`} className="ui button">Back</Link>
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
    form: 'editPackingMaterialMrpOne'
})(EditPackingMaterialMrpOne);
export default connect(mapStateToProps, { fetchPackingMaterial, editPackingMaterial })(formWrapped);