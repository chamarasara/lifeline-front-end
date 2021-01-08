import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchRawMaterial, editRawMaterial } from '../../../../actions';
import { Link } from 'react-router-dom'


class EditRawMaterialMrpTwo extends React.Component {
    componentDidMount() {
        this.props.fetchRawMaterial(this.props.match.params.id)

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
        this.props.editRawMaterial(this.props.match.params.id, formValues)
    }

    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <h4>Please select a Raw Material</h4>
                    </div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit MRP 2</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>Procurement</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.procurementType" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.procurementType} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.batchEntry" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.batchEntry} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.productStoreLocation" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.productStoreLocation}type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.quotaUsage" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.quotaUsage} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.supplyArea" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.supplyArea} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.backFlush" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.backFlush} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.storageLocation" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.storageLocation} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.jitDelivery" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.jitDelivery} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.procurement.stockgroup" component={this.renderInput} placeholder={this.props.material.mrpTwo.procurement.stockgroup} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="two wide field">
                                <label htmlFor="Co-Product">Co-Product</label>
                            </div>
                            <div className="two wide field">
                                <Field name="mrpTwo.procurement.coProduct" component={this.renderInput} label="" placeholder={this.props.material.mrpTwo.procurement.coProduct}type="checkbox" />
                            </div>
                            <div className="two wide field">
                                <label htmlFor="BulkMaterial">Bulk Material</label>
                            </div>
                            <div className="two wide field">
                                <Field name="mrpTwo.procurement.bulkMaterial" component={this.renderInput} label="" placeholder={this.props.material.mrpTwo.procurement.bulkMaterial} type="checkbox" />
                            </div>
                        </div>
                        <h4>Scheduling</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.inHouseProduction" component={this.renderInput} placeholder={this.props.material.mrpTwo.scheduling.inHouseProduction} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.plannedDeliveryTime" component={this.renderInput} placeholder={this.props.material.mrpTwo.scheduling.plannedDeliveryTime} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.grProcessingTime" component={this.renderInput} placeholder={this.props.material.mrpTwo.scheduling.grProcessingTime} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.planningCalender" component={this.renderInput} placeholder={this.props.material.mrpTwo.scheduling.planningCalender} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.scheduling.schedulingMarginKey" component={this.renderInput} placeholder={this.props.material.mrpTwo.scheduling.schedulingMarginKey} type="text" />
                            </div>
                        </div>
                        <h4>Net Requirements Calculation</h4>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.safetyStock" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.safetyStock} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.netRequirements.minSafetyStock" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.minSafetyStock} type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.serviceLevel" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.serviceLevel} type="number" />
                            </div>
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.coverageProfile" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.coverageProfile} type="text" />
                            </div>

                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="mrpTwo.netRequirements.safetyTimeInd" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.safetyTimeInd} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpTwo.netRequirements.safetyTime" component={this.renderInput} placeholder={this.props.material.mrpTwo.netRequirements.safetyTime} type="number" />
                            </div>
                        </div>

                        <div className="field">
                            <Link to={`/single-raw-material/${this.props.material._id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownPorps) => {
    return { material: state.rawMaterials[ownPorps.match.params.id], initialValues: state.rawMaterials[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editRawMaterialMrpTwo'
})(EditRawMaterialMrpTwo);
export default connect(mapStateToProps, { fetchRawMaterial, editRawMaterial })(formWrapped);