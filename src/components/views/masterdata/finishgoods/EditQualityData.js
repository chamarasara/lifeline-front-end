import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditQualityData extends React.Component {
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
                        <h4>Please select a Finish Good</h4>
                    </div>
                </div>
            )
        }

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Edit Quality Data</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                Shelf Life <span style={{ color: "red", fontSize: "18px" }}>*</span>
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
                            <Link to={`/single-finish-good-material/${this.props.material.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
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
const mapStateToProps = (state, ownPorps) => {
    return { material: state.finishGoods[ownPorps.match.params.id], initialValues: state.finishGoods[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editQualityData',
    validate
})(EditQualityData);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood })(formWrapped);