import React from 'react';
import _ from 'lodash';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NewReturnFormRaw from './NewReturnFormRaw';
import { fetchPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, printPurchaseOrderRaw, grnPurchaseOrderRaw } from '../../../actions';

class SinglePurchaseOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id)
        this.props.fetchGrnByPurchaseOrder(this.props.match.params.id)
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
    renderSuccessMessage() {
        if (this.props.sucessMessege === 200) {
            return (
                <div className="ui success message">
                    <div className="header">Successfull !</div>
                </div>
            )
        }
    }
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    renderRawMaterials() {
        return this.props.rawMaterials.map(rawMaterial => {
            return (
                <option key={rawMaterial._id} value={rawMaterial.id}>{rawMaterial.materialName}</option>
            )
        })
    }
    renderRawMaterialsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((rawMaterials, index) => <li key={index}>
                        <label htmlFor={rawMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field disabled">
                                Material Name
                                <Field name={`${rawMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderRawMaterials()}
                                </Field>
                            </div>
                            <div className="four wide field disabled">
                                Unit Of Measure
                                <Field name={`${rawMaterials}.uom`} type="text" required component={this.renderSelectField} placeholder="UOM" >
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
                                Quantity
                                <Field name={`${rawMaterials}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                Unit Price
                                <Field name={`${rawMaterials}.unitPrice`} type="number" required component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
    rederGrnForm() {

        return (
            <div>
                <div>
                    <h4>Create new GRN</h4>
                    <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <div className="fields">
                            <div className="six wide field">
                                Supplier Invoice Number
                                <Field name="invoiceNumber" type="text" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                            <div className="four wide field">
                                Invoice Date
                                <Field name="invoiceDate" type="date" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                </Field>
                            </div>
                            <div className="six wide field">
                                Remarks (Optional)
                                <Field name="remarks" type="text" required component={this.renderInput} placeholder="Remarks">
                                </Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="sixteen wide field">
                                <FieldArray name="rawMaterials" component={this.renderRawMaterialsDropDown} />
                            </div>
                        </div>

                        <div className="field">
                            <button type="submit" className="ui primary button">Submit</button>
                        </div>
                    </form>
                    {this.renderSuccessMessage()}
                </div>
            </div>
        )

    }
    onSubmit = (formValues) => {

        for (let i = 0; i < formValues.rawMaterials.length; i++) {
            formValues.rawMaterials[i].date = moment().format('DD/MM/YYYY, h:mm:ss a');
            formValues.rawMaterials[i].materialName = formValues.rawMaterialsList[i].materialName
            formValues.rawMaterials[i].materialCode = formValues.rawMaterialsList[i].materialCodeRm
            formValues.rawMaterials[i].materialGroup = formValues.rawMaterialsList[i].materialGroup
            formValues.rawMaterials[i].remainingQuantity = formValues.rawMaterials[i].quantity
            formValues.rawMaterials[i].supplierId = formValues.supplierId
            formValues.rawMaterials[i].companyName = formValues.supplier[0].companyName
            formValues.rawMaterials[i].purchaseOrderId = formValues.id
            formValues.rawMaterials[i].purchaseOrderNumber = formValues.orderNumber
            formValues.rawMaterials[i].invoiceNumber = formValues.invoiceNumber
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
            formValues.rawMaterials[i].invoiceDate = formValues.invoiceDate
        }
        console.log("Form", formValues)
        this.props.grnPurchaseOrderRaw(formValues._id, formValues)
    }
    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.rawMaterialsList.map(material => {
                        return (
                            <p key={material.id}>RM{material.materialCodeRm}</p>
                        )
                    })
                    }
                </td>
                <td> {this.props.order.rawMaterialsList.map(material => {
                    return (
                        <p key={material.id}>{material.materialName}</p>
                    )
                })
                }</td>
                <td> {this.props.order.rawMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.uom}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.rawMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.quantity}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.rawMaterials.map(material => {
                    const price = Number(material.unitPrice)
                    console.log(price)
                    return (
                        <p key={material.id}>{this.formatNumber(price.toFixed(2))}</p>
                    )
                })
                }
                </td>
                <td style={{ textAlign: "right" }}> {this.props.order.rawMaterials.map(material => {
                    const total = Number(material.unitPrice) * Number(material.quantity)
                    return (
                        <p key={material.id}>{this.formatNumber(total.toFixed(2))}</p>
                    )
                })
                }
                </td>
            </tr>
        )

    }
    renderSupplierDetails() {

        return (
            <div>
                <p><strong>Company Name:</strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.companyName}</span>
                    )
                })
                }</p>
                <p><strong>Address:</strong> {this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>
                            {Supplier.communicationAddress.no},
                            {Supplier.communicationAddress.lane},
                            {Supplier.communicationAddress.city},
                            {Supplier.communicationAddress.country},
                            {Supplier.communicationAddress.postalCode}.
                        </span>
                    )
                })
                }</p>
                <p><strong>Email: </strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.email}</span>
                    )
                })
                }</p>
                <p><strong>Contact Number: </strong>{this.props.order.supplier.map(Supplier => {
                    return (
                        <span key={Supplier.id}>{Supplier.mobileNo}</span>
                    )
                })
                }</p>
                <p><strong>Date: </strong>{moment(this.props.order.date).format('DD/MM/YYYY')}
                </p>
                <p>
                    <strong>Order State:</strong> {this.props.order.order_state}
                </p>
            </div>
        )

    }

    renderPrintButton() {
        if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <button type="button" onClick={this.printPurchaseOrder} className="ui primary button">Print</button>
                </div>
            )
        }
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    printGrn = (grnId) => {
        this.props.printGrnRaw(this.props.order.id, grnId)
    }
    printPurchaseOrder = () => {
        this.props.printPurchaseOrderRaw(this.props.order.id)
    }
    getSubTotal() {

        const orderDetails = this.props.order.rawMaterials
        let getTotal = orderDetails.map(data => {
            let totalValue = Number(data.unitPrice) * Number(data.quantity)
            let total = totalValue
            console.log(total)
            return total
        })

        let sum = []
        for (let i = 0; i < Math.min(getTotal.length); i++) {
            let total = Number(getTotal[i])
            sum[i] = total
        }
        console.log(sum)
        const totalSum = sum.reduce((a, b) => a + b, 0)
        return this.formatNumber(totalSum.toFixed(2))

    }
    getSubTotalGrn() {

        let grn = this.props.order.grnDetails

        const total = this.props.order.grnDetails.map(data => {
            console.log(data)
            return data.data.map(data => {
                // console.log(data.unitPrice * data.quantity)
                let total = data.unitPrice * data.quantity
                console.log(total)
                return total
            })
        })

        console.log(total)
        let totalSum = total.map(arr => arr.reduce((sum, item) => sum += item, 0))
        const subtotal = totalSum.map(sum => {
            console.log(sum)
            return sum
        })
        console.log(totalSum)
        return subtotal.map(subtotal => {
            return (
                <tr colSpan="16">
                    <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                    <th colSpan="8" style={{ textAlign: "right" }}>{subtotal}</th>
                </tr>
            )
        })



        // return this.formatNumber(totalSum.toFixed(2))

    }
    renderAllGrn() {
        if (!this.props.order.grnDetails) {
            return (
                <div style={{ paddingBottom: "15px", paddingTop: "15px", paddingLeft: "0px" }}>
                    <h4>No any GRN found</h4>
                </div>
            )
        }
        return this.props.order.grnDetails.map(data => {

            let grn = this.props.order.grnDetails
            const array = []
            const totalArray = data.data.map(data => {
                // console.log(data)
                let total = data.unitPrice * data.quantity
                // console.log(total)


                for (let i = 0; i < array.length; i++) {
                    array[i] = data.unitPrice * data.quantity


                }
                return total
            })

            // console.log(array)
            const total = grn.map(data => {
                // console.log(data)
                return data.data.map(data => {
                    // console.log(data.unitPrice * data.quantity)
                    let total = data.unitPrice * data.quantity
                    // console.log(data.unitPrice)
                    return total
                })
            })

            // console.log(totalArray)
            // console.log(total)
            let totalSum = total.map(arr => arr.reduce((sum, item) => sum += item, 0))
            const subtotal1 = totalSum.map(sum => {
                // console.log(sum)
                return sum
            })
            // console.log(totalSum)
            const subtotal = subtotal1.map(subtotal => {
                const sub = Number(subtotal)
                return (
                    <tr colSpan="16">
                        <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                        <th colSpan="8" style={{ textAlign: "right" }}>{this.formatNumber(sub.toFixed(2))}</th>
                    </tr>
                )
            })

            return (

                <table key={Math.random()} className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="8">
                                <tr><h4 style={{ color: "red" }}>{data.grnNumber}</h4></tr>
                                <tr><p>Date-{moment(data.date).format('MM/DD/YYYY, h:mm A')}</p></tr>
                                <tr><p>Invoice Number-{data.data.map(data => {
                                    return data.invoiceNumber
                                }
                                )}</p></tr>
                                <tr><p>Invoice Date-{data.data.map(data => {
                                    return moment(data.invoiceDate).format('MM/DD/YYYY')
                                }
                                )}</p></tr>
                                <tr><p>Remarks-{data.remarks}</p></tr>
                            </th>
                        </tr>
                        <tr>
                            <th>Material Code</th>
                            <th>Material Name</th>
                            <th>Unit of Measure</th>
                            <th style={{ textAlign: "right" }}>Unit Price</th>
                            <th style={{ textAlign: "right" }}>Quantity</th>
                            <th style={{ textAlign: "right" }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.order.rawMaterialsList.map(data => {
                                    return (
                                        <p key={data.id}>RM{data.materialCodeRm}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {this.props.order.rawMaterialsList.map(data => {
                                    return (
                                        <p key={data.id}>{data.materialName}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {data.data.map(data => {
                                    return (
                                        <p key={Math.random()}>{data.uom}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    const price = data.unitPrice
                                    return (
                                        <p key={Math.random()}>{price}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    return (
                                        <p key={Math.random()}>{data.quantity}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {data.data.map(data => {
                                    const price = Number(data.unitPrice)
                                    const quantity = data.quantity
                                    const total = Number(price) * Number(quantity)
                                    return (
                                        <p key={Math.random()}>{this.formatNumber(total.toFixed(2))}</p>
                                    )
                                })}
                            </td>
                        </tr>

                    </tbody>
                    <tfoot>
                        {subtotal}
                    </tfoot>
                </table>
            )

        })

    }
    rederGrn() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div>
                    <h4>Pending Purchase Order</h4>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <div>
                        {this.rederGrnForm()}
                        {this.renderAllGrn()}
                    </div>
                </div>
            )
        }
    }
    rederPaymentsTab() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div style={{ paddingBottom: "15px", paddingTop: "15px", paddingLeft: "0px" }}>
                    <h4>Pending Purchase Order</h4>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <div className="ui two column grid">
                        <div className="row">
                            <div className="column">
                                <NewReturnFormRaw data={this.props.order} />
                            </div>
                            <div className="column">
                                <NewReturnFormRaw data={this.props.order} />
                            </div>
                        </div>                   
                    </div>                   
                </div>
            )
        }
    }

    render() {
        if (!this.props.order) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        const panes = [
            {
                menuItem: 'Purchase Order Details', render: () =>
                    <Tab.Pane attached={false}>
                        <div>
                            <div>
                                <table className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                                    <thead className="full-width">
                                        <tr>
                                            <th colSpan="12" style={{ color: "red" }}><h4>Order Details</h4></th>
                                        </tr>
                                        <tr>
                                            <th>Product Code</th>
                                            <th>Product Name</th>
                                            <th>UOM</th>
                                            <th style={{ textAlign: "right" }}>Quantity</th>
                                            <th style={{ textAlign: "right" }}>Unit Price</th>
                                            <th style={{ textAlign: "right" }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPurchaseOrederDetails()}
                                    </tbody>
                                    <tfoot>
                                        <tr colSpan="16">
                                            <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                                            <th colSpan="8" style={{ textAlign: "right" }}>{this.getSubTotal()}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div style={{ paddingTop: "20px" }}>
                                {this.renderPrintButton()}
                            </div>
                        </div>
                    </Tab.Pane>
            },
            {
                menuItem: 'GRN Details', render: () =>
                    <Tab.Pane attached={false}>
                        {this.rederGrn()}
                    </Tab.Pane>
            },
            {
                menuItem: 'Payments', render: () =>
                    <Tab.Pane attached={false}>
                        {this.rederPaymentsTab()}
                    </Tab.Pane>
            }
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <h4><span style={{ color: "#2185d0" }}>Order No #{this.props.order.orderNumber}</span></h4>
                        {this.renderSupplierDetails()}
                    </div>
                    <Tab menu={{ pointing: true }} panes={panes} />
                    <div style={{ paddingTop: "20px" }}>
                        <Link to={"/purchase-order-dashboard-raw"} type="button" className="ui button">Back</Link>
                        <Link to={`/delete-purchase-order-raw/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.invoiceNumber) {
        errors.invoiceNumber = 'Please Enter Supplier Invoice Number';
    }
    if (!formValues.selectPurchaseOrderNumber) {
        errors.selectPurchaseOrderNumber = 'Please Enter Purchase Order';
    }
    if (!formValues.invoiceDate) {
        errors.invoiceDate = 'Please Enter Invoice Date';
    }
    if (!formValues.rawMaterials || !formValues.rawMaterials.length) {
        errors.rawMaterials = { _error: 'At least one material must be entered' }
    } else {
        const rawMaterialsArrayErrors = []
        formValues.rawMaterials.forEach((rawMaterials, index) => {
            const productErrors = {}
            if (!rawMaterials || !rawMaterials.quantity) {
                productErrors.quantity = 'Required, Minimum Value "0"'
                rawMaterialsArrayErrors[index] = productErrors
            }
            if (!rawMaterials || !rawMaterials.unitPrice) {
                productErrors.unitPrice = 'Required'
                rawMaterialsArrayErrors[index] = productErrors
            }
        })
        if (rawMaterialsArrayErrors.length) {
            errors.rawMaterials = rawMaterialsArrayErrors
        }
    }
    return errors;
}
const mapStateToProps = (state, ownPorps) => {
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const order = state.purchaseOrdersRaw[ownPorps.match.params.id]
    const sucessMessege = state.purchaseOrdersRaw.undefined
    console.log(state.purchaseOrdersRaw.undefined)

    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        order: order,
        sucessMessege: sucessMessege,
        initialValues: order,

    };
}
const formWrapped = reduxForm({
    form: 'purchaseOrderRawGrn',
    validate: validate
})(SinglePurchaseOrderRaw);

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, printPurchaseOrderRaw, grnPurchaseOrderRaw })(formWrapped);