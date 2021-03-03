import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';


class QualityData extends React.Component {
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
                    <h3>Quality Data</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>                                               
                        <div className="fields">
                            <div className="eight wide field">
                                Shelf Life (Months)<span style={{ color: "red", fontSize: "18px" }}>*</span>
                                <Field name="shelfLife" component={this.renderInput} placeholder="Shelf Life" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="eight wide field">
                                Perfume Code (Optional)<span style={{ color: "white", fontSize: "18px" }}>*</span>
                                <Field name="perfumeCode" component={this.renderInput} placeholder="Perfume Code" type="text" />
                            </div>
                        </div>                                 
                        <div className="field">
                            <button type="button" className="ui  button" onClick={previousPage}>
                                Previous
                            </button>
                            <button type="submit" className="ui primary button">Submit</button>
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
    if (!formValues.shelfLife) {
        errors.shelfLife = 'Required!';
    }    
    // if (!formValues.perfumeCode) {
    //     errors.perfumeCode = 'Required!';
    // }    
    return errors;
}
// const mapStateToProps = (state) => {
//     const supplier = Object.values(state.supplier)
//     return { supplier: supplier };
// }
const formWrapped = reduxForm({
    form: 'newFinishGood',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(QualityData);
export default connect(null, {  })(formWrapped);