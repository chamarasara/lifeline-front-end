import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditManagementData extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGood(this.props.match.params.id)

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
    onSubmit = (formValues) => {
        this.props.editFinishGood(this.props.material._id, formValues)
        console.log(formValues)
    }
    render() {
        if (!this.props.material) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <div class="ui text loader"></div>
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
                            <Link to={`/single-finish-good-material/${this.props.material.id}`} className="ui button">Back</Link>
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
    if (!formValues.profitCenter) {
        errors.profitCenter = 'Required!';
    }
    if (!formValues.barCode) {
        errors.barCode = 'Required!';
    }
    return errors;
}
const mapStateToProps = (state, ownPorps) => {
    return { material: state.finishGoods[ownPorps.match.params.id], initialValues: state.finishGoods[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editManagementData',
    validate: validate
})(EditManagementData);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood })(formWrapped);