import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchBom, editBom, fetchRawMaterials, fetchPackingMaterials, fetchFinishGoods } from '../../../../actions';
import ImageUploader from 'react-images-upload';


class EditBom extends React.Component {
    componentDidMount() {
        this.props.fetchBom(this.props.match.params.id)
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
        console.log(this.props.bom._id)
        this.props.editBom(this.props.bom._id, formValues)
        console.log(formValues)
    }
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
        if (!this.props.bom) {
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
                            <Link to={`/single-bom/${this.props.bom.id}`} className="ui button">Back</Link>
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    const supplier = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    const finishGoods = Object.values(state.finishGoods)
    const bom = state.bom[ownPorps.match.params.id]
    return { bom: bom, initialValues: bom, supplier: supplier, packingMaterials: packingMaterials, rawMaterials: rawMaterials, finishGoods: finishGoods };
}

const formWrapped = reduxForm({
    form: 'editBom',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true
})(EditBom);
export default connect(mapStateToProps, { fetchBom, editBom, fetchRawMaterials, fetchPackingMaterials, fetchFinishGoods })(formWrapped);