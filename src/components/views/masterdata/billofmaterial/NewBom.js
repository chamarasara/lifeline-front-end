import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { fetchRawMaterials, fetchPackingMaterials, fetchFinishGoods } from '../../../../actions';
import { Link } from 'react-router-dom'
//import ImageUploader from 'react-images-upload';


class NewBom extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { pictures: [] };
    //     this.onDrop = this.onDrop.bind(this);
    // }
    componentDidMount() {
        this.props.fetchRawMaterials()
        this.props.fetchPackingMaterials()
        this.props.fetchFinishGoods()
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
    renderRawMaterials() {
        return this.props.rawMaterials.map(rawMaterial => {
            return (
                <option key={rawMaterial._id} value={rawMaterial.id}>RM{rawMaterial.materialCodeRm}-{rawMaterial.materialName}</option>
            )
        })
    }
    renderRawMaterialsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((rawMaterials, index) => <li key={index}>
                        <label htmlFor={rawMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${rawMaterials}.id`} type="text" required component="select" >
                                    <option>-Select Material-</option>
                                    {this.renderRawMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${rawMaterials}.percentage`} type="number" required component="input" placeholder="Percentage %" >
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Raw Material</button>

            </div>
        )
    }
    renderPackingMaterials() {
        return this.props.packingMaterials.map(packingMaterial => {
            return (
                <option key={packingMaterial._id} value={packingMaterial.id}>PM{packingMaterial.materialCodePm}-{packingMaterial.materialName}</option>
            )
        })
    }
    renderPackingMaterialsDropDown = ({ fields }) => {
        return (
            <div>
                <ul>
                    {fields.map((packingMaterials, index) => <li key={index}>
                        <label htmlFor={packingMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field">
                                <Field name={`${packingMaterials}.id`} type="text" required component="select" >
                                    <option>-Select Material-</option>
                                    {this.renderPackingMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field">
                                <Field name={`${packingMaterials}.quantity`} type="number" required component="input" placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="eight wide field">
                                <button className="mini ui red button" type="button" onClick={() => fields.remove(index)}>Remove</button>
                            </div>
                        </div>
                    </li>)}
                </ul>
                <button className="mini ui primary button" type="button" onClick={() => fields.push()}>Add Packing Material</button>

            </div>
        )
    }
    renderFinishGoods() {
        return this.props.finishGoods.map(finishGood => {
            return (
                <option key={finishGood._id} value={finishGood.id}>FG{finishGood.productCode}-{finishGood.productName}</option>
            )
        })
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Bill of Material</h3>
                    <form className="ui mini form error" onSubmit={handleSubmit}>
                        <div className="fields">
                            <div className="eight wide field">
                                BOM Name <span style={{ color: "red", fontSize: "18px" }}>*</span>                               
                                <Field name="bomName" type="text" required component={this.renderSelectField} >
                                    <option>-Select FG-</option>
                                    {this.renderFinishGoods()}
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Raw Materials-
                                <FieldArray name="rawMaterials" component={this.renderRawMaterialsDropDown} />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                Packing Material-
                                <FieldArray name="packingMaterials" component={this.renderPackingMaterialsDropDown} />
                            </div>
                        </div>
                        <div className="field">
                            <Link to={"/bom"} className="ui button">Back</Link>
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
    if (!formValues.bomName) {
        errors.bomName = 'Required!';
    }
    // if (!formValues.barCodeImage) {
    //     errors.barCodeImage = 'Required!';
    // }
    return errors;
}
const mapStateToProps = (state) => {
    console.log(state)
    const supplier = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    const finishGoods = Object.values(state.finishGoods)
    return { supplier: supplier, rawMaterials: rawMaterials, packingMaterials: packingMaterials, finishGoods: finishGoods };
}
const formWrapped = reduxForm({
    form: 'newBom',
    validate: validate,
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(NewBom);
export default connect(mapStateToProps, { fetchRawMaterials, fetchPackingMaterials, fetchFinishGoods })(formWrapped);