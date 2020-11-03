import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createRawMaterial } from '../../../../actions';

class RawMaterialPlantDataTwo extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }  

    render() {
        const { handleSubmit, pristine, previousPage, submitting } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Plant Data/Store Two</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <h4>Weight/Volume</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.grossWeight" component={this.renderInput} placeholder="Gross Weight" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.weightUnit" component={this.renderInput} placeholder="Weight Unit" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.netWeight" component={this.renderInput} placeholder="Net Weight" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volume" component={this.renderInput} placeholder="volume" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volumeUnit" component={this.renderInput} placeholder="Volume Unit" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="plantDataTwo.weight.dimensions" component={this.renderInput} placeholder="Size/Dimensions" type="text" />
                            </div>
                        </div>
                        <h4>General Plant Parameters</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.seriolNumberProfile" component={this.renderInput} placeholder="Serial Number Profile" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.profitCenter" component={this.renderInput} placeholder="Profit Center" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.logHandlingGroup" component={this.renderInput} placeholder="Log Handling Group" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.distributorProfile" component={this.renderInput} placeholder="Distributor Profile" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.generalParameters.stockDetermGroup" component={this.renderInput} placeholder="Stock Determ. Group" type="text" />
                            </div>
                            <div className="two wide field">
                                <Field name="plantDataTwo.generalParameters.serLevel" component={this.renderInput} placeholder="Ser. Level" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return { state: state };
}
const formWrapped = reduxForm({
    form: 'newRawMaterial',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(RawMaterialPlantDataTwo);
export default connect(mapStateToProps, { createRawMaterial })(formWrapped);