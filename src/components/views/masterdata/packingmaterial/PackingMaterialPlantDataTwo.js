import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createRawMaterial } from '../../../../actions';

class PackingMaterialPlantDataTwo extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }   
    renderSelectField = ({ input, label, type, meta, children }) => (
        <div>
            <label>{label}</label>
            <div>
                <select {...input}>
                    {children}
                </select>
                {this.renderError(meta)}
            </div>
        </div>
    )
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    errorMessage() {
        if (this.props.errorMessage) {
            console.log(this.props)
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
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
                                <Field name="plantDataTwo.weight.containerType" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Container Type-</option>
                                    <option value="Bag">Bag</option>
                                    <option value="Bottle">Bottle</option>
                                    <option value="Can">Can</option>
                                    <option value="Drum">Drum</option>
                                    <option value="Big Bag">Big Bag</option>
                                    <option value="Box">Box</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.unitsPerPallet" component={this.renderInput} placeholder="Units per Pallet" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.grossWeightPerUnit" component={this.renderInput} placeholder="Gross Weight per Unit" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.weightUnit" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Weight Unit-</option>
                                    <option value="mg">mg</option>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="MT">MT</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.netWeight" component={this.renderInput} placeholder="Net Weight" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volume" component={this.renderInput} placeholder="volume" type="number" />
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.volumeUnit" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Volume Unit-</option>
                                    <option value="cm3">cm3</option>
                                    <option value="m3">m3</option>
                                    <option value="ft3">ft3</option>
                                </Field>
                            </div>
                        </div>
                        <h4>Dimensions  </h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.dimensionsUnit" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Dimension Unit-</option>
                                    <option value="mm">mm</option>
                                    <option value="cm">cm</option>
                                    <option value="m">m</option>
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.dimensionsL" required component={this.renderInput} placeholder="Length" type="number" >
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.dimensionsW" required component={this.renderInput} placeholder="Width" type="number" >
                                </Field>
                            </div>
                            <div className="three wide field">
                                <Field name="plantDataTwo.weight.dimensionsH" required component={this.renderInput} placeholder="Height" type="number" >
                                </Field>
                            </div>
                        </div> 
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" disabled={pristine || submitting} className="ui primary button">Submit</button>
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
    form: 'newPackingMaterial',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(PackingMaterialPlantDataTwo);
export default connect(mapStateToProps, {  })(formWrapped);