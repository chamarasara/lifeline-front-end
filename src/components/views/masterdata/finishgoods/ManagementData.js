import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';


class ManagementData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
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
    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
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
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Management Data</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>                                               
                        <div className="fields">
                            <div className="eight wide field">
                                Profit Center <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="profitCenter" component={this.renderInput} placeholder="Profit Center" type="text" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Bar Code <span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="barCode" component={this.renderInput} placeholder="Bar Code" type="number" />
                            </div>
                            <div className="four wide field">
                                Art Work Number(Optional)
                                <Field name="artWorkNumber" component={this.renderInput} placeholder="Art Work Number" type="text" />
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
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.profitCenter) {
        errors.profitCenter = 'Required!';
    }    
    if (!formValues.barCode) {
        errors.barCode = 'Required!';
    }    
    return errors;
}
const mapStateToProps = (state) => {
    const supplier = Object.values(state.supplier)
    return { supplier: supplier };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(ManagementData);
export default connect(null, {  })(formWrapped);