import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { fetchDistributors } from '../../../../actions';
import { Link } from 'react-router-dom'
import ImageUploader from 'react-images-upload';


class DistributorData extends React.Component {
    componentDidMount() {
        this.props.fetchDistributors()
    }
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
    renderDistributors() {
        return this.props.distributor.map(distributor => {
            return (
                <option key={distributor.id} value={distributor.id}>{distributor.companyName}</option>
            )
        })
    }
    renderDistributorDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((distributors, index) => <li key={index}>
                        <label htmlFor={distributors}>Distributor #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${distributors}.id`} type="text" component={this.renderSelectField} >
                                    <option>-Select Distributor-</option>
                                    {this.renderDistributors()}
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Distributor</button>

            </div>
        )
    }
    render() {
        const { handleSubmit, previousPage } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Distributor Data</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>                                               
                        <div className="fields">
                            <div className="eight wide field">
                                <label>Distributors- </label>
                                <FieldArray name="distributors" component={this.renderDistributorDropDown} />
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
    if (!formValues.distributors || !formValues.distributors.length) {
        errors.distributors = { _error: 'At least one distributor must be entered' }
    }    
    return errors;
}
const mapStateToProps = (state) => {
    const distributor = Object.values(state.distributor)
    return { distributor: distributor };
}
const formWrapped = reduxForm({
    form: 'newFinishGood',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true,
})(DistributorData);
export default connect(mapStateToProps, { fetchDistributors })(formWrapped);