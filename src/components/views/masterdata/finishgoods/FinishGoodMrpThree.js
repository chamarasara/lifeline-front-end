import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';


class FinishGoodMrpThree extends React.Component {

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
            </div>
        );
    }
    mrpThree = {
        forecast: {
            periodIndicator: "", fiscalYearVariant: "", splittingIndicator: ""
        },
        planning: {
            stratergyGroup: "", consumptionMode: "", fwdConsuptionPer: "", planningMaterial: "", planningConvFactor: ""
        }
    }
   
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create MRP 3</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <h4>Forecast Requirements</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.periodIndicator" component={this.renderInput} placeholder="Period Indicator" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.fiscalYearVariant" component={this.renderInput} placeholder="Fiscal Year Variant" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.forecast.splittingIndicator" component={this.renderInput} placeholder="Splitting Indicator" type="text" />
                            </div>
                        </div>
                        <h4>Planning</h4>
                        <div className="fields">
                            <div className="three wide field">
                                <Field name="mrpThree.planning.stratergyGroup" component={this.renderInput} placeholder="Stratergy Group" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.consumptionMode" component={this.renderInput} placeholder="Consumption Mode" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.fwdConsuptionPer" component={this.renderInput} placeholder="Fwd Consumption Per." type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.planningMaterial" component={this.renderInput} placeholder="Planning Material" type="text" />
                            </div>
                            <div className="three wide field">
                                <Field name="mrpThree.planning.planningConvFactor" component={this.renderInput} placeholder="Planning Conv Factor" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
   // console.log(state)
    return { state: state };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(FinishGoodMrpThree);
export default connect(mapStateToProps, {  })(formWrapped);