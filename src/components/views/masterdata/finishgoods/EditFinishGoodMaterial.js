import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchFinishGood, editFinishGood } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditFinishGoodMaterial extends React.Component {
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
    onSubmit = (formValues) => {
        this.props.editFinishGood(this.props.match.params.id, formValues)
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
                    <h3>Edit Basic Details</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="eight wide field">
                                Product Name
                                <Field name="productName" component={this.renderInput} placeholder={this.props.material.productName} type="text" />
                            </div>
                            <div className="four wide field">
                                Product Category
                                <Field name="productCategory" component={this.renderSelectField} type="text" >
                                    <option>-Select Product Category-</option>
                                    <option value="Pharmaceutical">Pharmaceutical</option>
                                    <option value="Cosmetics">Cosmetics</option>
                                    <option value="Other">Other</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Unit of Measure
                                <Field name="baseUnitMeasure" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-UOM-</option>
                                    <option value="Each">Each</option>
                                    <option value="kg">kg</option>
                                    <option value="l">l</option>
                                    <option value="m">m</option>
                                    <option value="ml">ml</option>
                                    <option value="g">g</option>
                                    <option value="cm">cm</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Division
                                <Field name="division" required component={this.renderSelectField} placeholder="" type="text" >
                                    <option>-Select Division-</option>
                                    <option value="Shampoo">Shampoo</option>
                                    <option value="Cream">Cream</option>
                                    <option value="Conditioner">Conditioner</option>
                                    <option value="Soap">Soap</option>
                                    <option value="Face Sheild">Face Sheild</option>
                                    <option value="Sanitizer">Sanitizer</option>
                                    <option value="Hand Wash">Hand Wash</option>
                                    <option value="Glove">Glove</option>
                                    <option value="Mask">Mask</option>
                                    <option value="Coat">Coat</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Powder">Powder</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                Product State
                                <Field name="productState" component={this.renderSelectField} type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="disabled">Disabled</option>
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Selling Price 
                                <Field name="sellingPrice" component={this.renderInput} placeholder="sellingPrice" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Bar Code
                                <Field name="barCode" component={this.renderInput} placeholder="Bar Code" type="number" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                Produt Description
                                <Field name="productDescription" component="textarea" placeholder="Peoduct Description(Optional)" type="text" />
                            </div>
                        </div>                        
                        <div className="field">
                            <Link to={`/single-finish-good-material/${this.props.material._id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    return { material: state.finishGoods[ownPorps.match.params.id], initialValues: state.finishGoods[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editFinishGoodMaterial'
})(EditFinishGoodMaterial);
export default connect(mapStateToProps, { fetchFinishGood, editFinishGood })(formWrapped);