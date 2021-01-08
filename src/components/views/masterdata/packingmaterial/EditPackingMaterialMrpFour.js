import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchPackingMaterial, editPackingMaterial } from '../../../../actions';


class EditPackingMaterialMrpFour extends React.Component {
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
                    <h3>Edit MRP 4</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>BOM Explosion/Dependent Requirements</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpFour.bom.selectionMethod" component={this.renderInput} placeholder={this.props.material.mrpFour.bom.selectionMethod} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.individual" component={this.renderInput} placeholder={this.props.material.mrpFour.bom.individual} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.componentScrap" component={this.renderInput} placeholder={this.props.material.mrpFour.bom.componentScrap} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.requirementsGroup" component={this.renderInput} placeholder={this.props.material.mrpFour.bom.requirementsGroup} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.bom.depRequirements" component={this.renderInput} placeholder={this.props.material.mrpFour.bom.depRequirements} type="text" />
                            </div>
                        </div>
                        <h4>Discontinued Parts</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.discontinuedInd" component={this.renderInput} placeholder={this.props.material.mrpFour.discontinuedParts.discontinuedInd} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.effOut" component={this.renderInput} placeholder={this.props.material.mrpFour.discontinuedParts.effOut} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpFour.discontinuedParts.followUpMaterial" component={this.renderInput} placeholder={this.props.material.mrpFour.discontinuedParts.followUpMaterial} type="text" />
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
    form: 'editPackingMaterialMrpFour'
})(EditPackingMaterialMrpFour);
export default connect(mapStateToProps, { fetchPackingMaterial, editPackingMaterial })(formWrapped);