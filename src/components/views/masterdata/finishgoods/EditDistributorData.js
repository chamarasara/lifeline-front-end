import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood, fetchDistributors } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditDistributorData extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGood(this.props.match.params.id)
        this.props.fetchDistributors()

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

    renderInput = ({ input, label, placeholder, type, meta, required }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
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
    onSubmit = (formValues) => {
        this.props.editFinishGood(this.props.material._id, formValues)      
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
                    <h3>Edit Management Data</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                <label>Distributors- </label>
                                <FieldArray name="distributors" component={this.renderDistributorDropDown} />
                            </div>
                        </div>                              
                        <div className="field">
                            <Link to={`/single-finish-good-material/${this.props.material.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    console.log(state)
    const material = state.finishGoods[ownPorps.match.params.id]
    const distributor = Object.values(state.distributor)
    
    return { material: material, initialValues: material, distributor: distributor};
}
const formWrapped = reduxForm({
    form: 'editDistributorData'
})(EditDistributorData);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood, fetchDistributors })(formWrapped);