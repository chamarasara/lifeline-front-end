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
                    <h3>Edit Plant Data/Store One</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>General Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.baseUnitPlant" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.baseUnitPlant} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.unitOfIssue" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.unitOfIssue} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.tempConditions" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.tempConditions} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.storageConditions" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.storageConditions} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.containerRequirements" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.containerRequirements} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.hazMaterialNumber" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.hazMaterialNumber} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.ccPhysInvInd" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.ccPhysInvInd} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.grSlips" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.grSlips} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.labelType" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.labelType} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.generalData.labelFrom" component={this.renderInput} placeholder={this.props.material.plantDataOne.generalData.labelFrom} type="text" />
                            </div>
                        </div>
                        <h4>Shelf Life Data</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.maxStoragePeriod" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.maxStoragePeriod} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.timeUnit" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.timeUnit} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.minRemainigShelfLife" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.minRemainigShelfLife} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.totalShelfLife" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.totalShelfLife}type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataOne.shelfLifeData.periodForSled" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.periodForSled} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataOne.shelfLifeData.storagePercentage" component={this.renderInput} placeholder={this.props.material.plantDataOne.shelfLifeData.storagePercentage} type="text" />
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
    return { material: state.packingMaterials[ownPorps.match.params.id], initialValues: state.packingMaterials[ownPorps.match.params.id]  };
}
const formWrapped = reduxForm({
    form: 'editPackingMaterialPlantOne',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(EditPackingMaterialPlantOne);
export default connect(mapStateToProps, { fetchPackingMaterial, editPackingMaterial })(formWrapped);