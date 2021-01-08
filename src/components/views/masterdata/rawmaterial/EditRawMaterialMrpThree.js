import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchRawMaterial, editRawMaterial } from '../../../../actions';


class EditRawMaterialMrpThree extends React.Component {
    componentDidMount() {
        this.props.fetchRawMaterial(this.props.match.params.id)

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
                    <h3>Edit MRP 3</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>Forecast Requirements</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.periodIndicator" component={this.renderInput} placeholder={this.props.material.mrpThree.forecast.periodIndicator} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.fiscalYearVariant" component={this.renderInput} placeholder={this.props.material.mrpThree.forecast.periodIndicator} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.splittingIndicator" component={this.renderInput} placeholder={this.props.material.mrpThree.forecast.periodIndicator} type="text" />
                            </div>
                        </div>
                        <h4>Planning</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpThree.planning.stratergyGroup" component={this.renderInput} placeholder={this.props.material.mrpThree.planning.stratergyGroup} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.consumptionMode" component={this.renderInput} placeholder={this.props.material.mrpThree.planning.consumptionMode} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.fwdConsuptionPer" component={this.renderInput} placeholder={this.props.material.mrpThree.planning.fwdConsuptionPer} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.planningMaterial" component={this.renderInput} placeholder={this.props.material.mrpThree.planning.planningMaterial} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.planningConvFactor" component={this.renderInput} placeholder={this.props.material.mrpThree.planning.planningConvFactor} type="text" />
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
    form: 'editRawMaterialMrpThree'
})(EditRawMaterialMrpThree);
export default connect(mapStateToProps, { fetchRawMaterial, editRawMaterial })(formWrapped);