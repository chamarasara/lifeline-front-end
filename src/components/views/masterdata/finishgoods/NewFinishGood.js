import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchSuppliers, createRawMaterial } from '../../../../actions';
import history from '../../../history';

class NewFinishGood extends React.Component {
    componentDidMount() {
        //this.props.fetchSuppliers()
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
                <input {...input} placeholder={placeholder} required type={type} autoComplete="off" />
            </div>
        );
    }
    onSubmit = (formValues) => {
        // console.log(formValues)
        // const values = {}
        // const finishGood= {...values, formValues};
        // console.log(finishGood)
        localStorage.setItem('finishGood', JSON.stringify(formValues))
        var fg = localStorage.getItem('finishGood')
        console.log(fg)
        // const suppliers = [];
        // suppliers.push({ id: parseInt(formValues.suppliers.supplierOne) }, { id: parseInt(formValues.suppliers.supplierTwo) }, { id: parseInt(formValues.suppliers.supplierThree) }, { id: parseInt(formValues.suppliers.supplierFour)})
        // console.log(suppliers)      
        // const values = {...formValues, suppliers}
        // //delete formValues.suppliers;
        // console.log(values)
        //this.props.createRawMaterial(values)
        history.push("/finish-good-mrp-one")
    }

    render() {

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <h3>Create Finish Good</h3>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
                                <p>Material Status</p>
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Material Status-</option>
                                    <option value="enabled">Enabled</option>
                                    <option value="desabled">Desabled</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                <p>Item Category</p>
                                <Field name="materialState" component="select" type="text" >
                                    <option>-Select Item Category-</option>
                                    <option value="enabled">Category One</option>
                                    <option value="desabled">Category Two</option>
                                </Field>
                            </div>
                            <div className="four wide field">
                                <p>Validity (Start Date)</p>
                                <Field name="validityStartDate" component={this.renderInput} placeholder="Start Date" type="date" />
                            </div>
                            <div className="four wide field">
                                <p>Validity (End Date)</p>
                                <Field name="validityEndDate" component={this.renderInput} placeholder="End Date" type="date" />
                            </div>
                        </div>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="grossWeight" component={this.renderInput} placeholder="Gross Weight" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="netWeight" component={this.renderInput} placeholder="Net Weight" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="weightUnit" component={this.renderInput} placeholder="Weight Unit" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="volumeUnit" component={this.renderInput} placeholder="Volume Unit" type="text" />
                            </div>
                        </div>
                        <h4>General Plant Parameters</h4>
                        <div className="fields">
                            <div className="four wide field">
                                <Field name="profitCenter" component={this.renderInput} placeholder="Profit Center" type="text" />
                            </div>
                            <div className="four wide field">
                                <Field name="serialNumberProfile" component={this.renderInput} placeholder="Serial Number Profile" type="text" />
                            </div>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui primary button">Next</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     const supplier = Object.values(state.supplier)
//     console.log(supplier)
//     return { supplier: supplier };
// }
const formWrapped = reduxForm({
    form: 'newFinishGood'
})(NewFinishGood);
export default connect(null, { fetchSuppliers, createRawMaterial })(formWrapped);