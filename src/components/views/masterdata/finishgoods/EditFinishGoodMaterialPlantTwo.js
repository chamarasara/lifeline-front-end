import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood  } from '../../../../actions';

class EditFinishGoodMaterialPlantTwo extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGood(this.props.match.params.id)
    }

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }    
    onSubmit = (formValues) => {
        this.props.editFinishGood(this.props.match.params.id, formValues)
    }
    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <h4>Please select a Finish Good</h4>
                    </div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Plant Data/Store Two</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <h4>Weight/Volume</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.grossWeight" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.grossWeight} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.weightUnit" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.weightUnit} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.netWeight" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.netWeight} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volume" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.volume} type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volumeUnit" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.volumeUnit} type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="plantDataTwo.weight.dimensions" component={this.renderInput} placeholder={this.props.material.plantDataTwo.weight.dimensions} type="text" />
                            </div>
                        </div>
                        <h4>General Plant Parameters</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.seriolNumberProfile" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.seriolNumberProfile} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.profitCenter" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.profitCenter} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.logHandlingGroup" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.logHandlingGroup} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.distributorProfile" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.distributorProfile} type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.stockDetermGroup" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.stockDetermGroup} type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.serLevel" component={this.renderInput} placeholder={this.props.material.plantDataTwo.generalParameters.serLevel} type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={`/single-finish-good-material/${this.props.material._id}`} className="ui button">Back</Link>
                            <button type="submit"  className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownPorps) => {
    return { material: state.finishGoods[ownPorps.match.params.id], initialValues: state.finishGoods[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editFinishGoodMaterialPlantTwo',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(EditFinishGoodMaterialPlantTwo);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood  })(formWrapped);