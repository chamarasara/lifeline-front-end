import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class NewSemiFinishGood extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }
    

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Semi Finish Good</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name="materialName" component={this.renderInput} placeholder="Material Name" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialCode" component={this.renderInput} placeholder="Material Code" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="materialGroup" component={this.renderInput} placeholder="Material Group" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="baseUnitMeasure" component={this.renderInput} placeholder="Base Unit Measure" type="text" />
                            </div>
                            <div className="five wide field">
                                <Field name="oldMaterialNumber" component={this.renderInput} placeholder="Old Material Number" type="text" />
                            </div>
                            <div className="seven wide field">
                                <Field name="division" component={this.renderInput} placeholder="Division" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>                        
                        <div className="field">
                            <Link to={"/semi-finish-goods"} className="ui button">Back</Link> 
                            <button type="submit" className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const supplier = Object.values(state.supplier)
    return { supplier: supplier };
}
const formWrapped = reduxForm({
    form: 'newSemiFinishGood',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(NewSemiFinishGood);
export default connect(mapStateToProps, {  })(formWrapped);