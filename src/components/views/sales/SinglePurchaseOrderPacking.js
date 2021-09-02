import React from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Tab } from 'semantic-ui-react'
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrderPacking, printPurchaseOrderPacking, fetchSuppliers, fetchPackingMaterials, createNewGrnPm, fetchGrnByPurchaseOrderPm, printGrnPm, viewSupplierInvoicePacking } from '../../../actions';

class SinglePurchaseOrderPacking extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id)
        this.props.fetchGrnByPurchaseOrderPm(this.props.match.params.id)
        this.props.fetchSuppliers()
        this.props.fetchPackingMaterials()
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    rendeSuppliers() {
        return this.props.suppliers.map(supplier => {
            return (
                <option key={supplier._id} value={supplier.id}>{supplier.companyName}</option>
            )
        })
    }
    printGrn(id) {
        this.props.printGrnPm(id)
    }
    renderAllGrn() {
        if (!this.props.grn) {
            return (
                <div>
                    <h4>NO any GRN found</h4>
                </div>
            )
        }
        return this.props.grn.map(data => {
            if (!data.packingMaterials || !data.materialDetails) {
                return []
            }
            const grnData = data.packingMaterials.map(material => {
                // console.log(material)
                return material
            })
            const materialData = data.materialDetails.map(material => {
                // console.log(material)
                return material
            })
            console.log(grnData)
            let totalValue = []
            for (let i = 0; i < Math.min(grnData.length); i++) {
                let total = grnData[i]
                console.log(total)
                totalValue[i] = Number(total.quantity) * Number(total.unitPrice)
                console.log(total.quantity)
                console.log(total.unitPrice)
                console.log(totalValue[i])

            }
            const grnId = data.id
            const total = totalValue.reduce((a, b) => (a + b))
            console.log(total)
            return (
                <table className="ui celled small padded compact structured table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th>Date</th>
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
                                {grnData.map(data => {
                                    return (
                                        <p>{data.date}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {materialData.map(data => {
                                    return (
                                        <p>RM{data.materialCodeRm}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {materialData.map(data => {
                                    return (
                                        <p>{data.materialName}</p>
                                    )
                                })}
                            </td>
                            <td>
                                {grnData.map(data => {
                                    return (
                                        <p>{data.uom}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {grnData.map(data => {
                                    let price = Number(data.unitPrice)
                                    return (
                                        <p>{this.formatNumber(price.toFixed(2))}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {grnData.map(data => {
                                    return (
                                        <p>{data.quantity}</p>
                                    )
                                })}
                            </td>
                            <td style={{ textAlign: "right" }}>
                                {grnData.map(data => {
                                    let total = Number(data.quantity) * Number(data.unitPrice)
                                    return (
                                        <p>{this.formatNumber(total.toFixed(2))}</p>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr colSpan="12">
                            <th colSpan="4" style={{ textAlign: "left" }}><button type="button" onClick={() => this.printGrn(grnId)} className="ui primary button">Print</button></th>
                            <th colSpan="8" style={{ textAlign: "right" }}>Subtotal: {this.formatNumber(total.toFixed(2))} </th>
                        </tr>
                    </tfoot>
                </table>
            )

        })

    }
    renderPackingMaterialsDropDown = ({ fields, meta: { error, submitFailed } }) => {
        return (
            <div>
                <ul>
                    {fields.map((packingMaterials, index) => <li key={index}>
                        <label htmlFor={packingMaterials}>Material #{index + 1}</label>
                        <div className="fields">
                            <div className="eight wide field disabled">
                                Material Name
                                <Field name={`${packingMaterials}.id`} type="text" required component={this.renderSelectField} >
                                    <option>-Select Material-</option>
                                    {this.renderPackingaterials()}
                                </Field>
                            </div>
                            <div className="four wide field disabled">
                                Unit Of Measure
                                <Field name={`${packingMaterials}.uom`} type="text" required component={this.renderSelectField} placeholder="UOM" >
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
                                <Field name={`${packingMaterials}.quantity`} type="number" required component={this.renderInput} placeholder="Quantity" >
                                </Field>
                            </div>
                            <div className="four wide field">
                                Unit Price
                                <Field name={`${packingMaterials}.unitPrice`} type="number" required component={this.renderInput} placeholder="Unit Price" >
                                </Field>
                            </div>
                        </div>
                    </li>)}
                </ul>
            </div>
        )
    }
    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.packingMaterialsList.map(material => {
                        return (
                            <p key={material.id}>PM{material.materialCodePm}</p>
                        )
                    })
                    }
                </td>
                <td> {this.props.order.packingMaterialsList.map(material => {
                    return (
                        <p key={material.id}>{material.materialName}</p>
                    )
                })
                }</td>
                <td> {this.props.order.packingMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.uom}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    return (
                        <p key={material.id}>{material.quantity}</p>
                    )
                })
                }</td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    const price = parseInt(material.unitPrice)
                    return (
                        <p key={material.id}>{this.formatNumber(price.toFixed(2))}</p>
                    )
                })
                }
                </td>
                <td style={{ textAlign: "right" }}> {this.props.order.packingMaterials.map(material => {
                    const total = parseInt(material.unitPrice) * parseInt(material.quantity)
                    return (
                        <p key={material.id}>{this.formatNumber(total.toFixed(2))}</p>
                    )
                })
                }
                </td>
            </tr>
        )

    }
    getSubTotal() {

        const orderDetails = this.props.order.packingMaterials
        let getTotal = orderDetails.map(data => {
            let totalValue = parseInt(data.unitPrice) * parseInt(data.quantity)
            let total = totalValue
            return this.formatNumber(total.toFixed(2))
        })

        let sum = []
        for (let i = 0; i < Math.min(getTotal.length); i++) {
            let total = parseInt(getTotal[i])
            sum[i] = total
        }
        const totalSum = sum.reduce((a, b) => a + b, 0)
        return this.formatNumber(totalSum.toFixed(2))

    }
    renderSupplierDetails() {
        console.log(this.props.order.supplier)
        return (
            <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
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
                <p>
                    <strong>Date: </strong>{moment(this.props.order.date).format('DD/MM/YYYY')}
                </p>
                <p>
                    <strong>Order State:</strong> {this.props.order.order_state}
                </p>
            </div>
        )

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
                        <h4>Create new GRN</h4>
                        <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <div className="fields">
                                <div className="five wide field">
                                    <Field name="invoiceNumber" type="text" required component={this.renderInput} placeholder="Supplier Invoice Number">
                                    </Field>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="sixteen wide field">
                                    <label>Raw Materials- </label>
                                    <FieldArray name="packingMaterials" component={this.renderPackingMaterialsDropDown} />
                                </div>
                            </div>
                            <div className="field">
                                <button type="submit" className="ui primary button">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        {this.renderAllGrn()}
                    </div>
                </div>
            )
        }
    }
    renderPrintButton() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div>
                    <Link to={"/purchase-order-dashboard-packing"} type="button" className="ui button">Back</Link>
                    <Link to={`/delete-purchase-order-packing/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <Link to={"/purchase-order-dashboard-packing"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/delete-purchase-order-packing/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        }
    }
    onClick = () => {
        this.props.printPurchaseOrderPacking(this.props.order.id)
    }
    viewSupplierInvoice = () => {
        this.props.viewSupplierInvoicePacking(this.props.order.suplierInvoicePdf)
    }
    onSubmit = (formValues) => {
        for (let i = 0; i < formValues.packingMaterials.length; i++) {
            formValues.packingMaterials[i].date = moment().format('DD/MM/YYYY, h:mm:ss a');
            formValues.packingMaterials[i].remainingQuantity = formValues.packingMaterials[i].quantity
            formValues.packingMaterials[i].supplierId = formValues.supplierId
            formValues.packingMaterials[i].purchaseOrderId = formValues.id
            formValues.packingMaterials[i].purchaseOrderNumber = formValues.orderNumber
        }
        console.log(formValues)
        this.props.createNewGrnPm(formValues)
    }

    render() {
        if (!this.props.order) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        const panes = [
            {
                menuItem: 'Purchase Order Details', render: () =>
                    <div>
                        <div>
                            <Tab.Pane attached={false}>
                                <table className="ui celled small padded compact structured table" style={{ marginTop: "20px" }}>
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
                            </Tab.Pane>
                        </div>                       
                    </div>
            },
            {
                menuItem: 'GRN Details', render: () =>
                    <Tab.Pane attached={false}>
                        {this.rederGrn()}
                    </Tab.Pane>
            }
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Order No #{this.props.order.orderNumber}</h3>
                    {this.renderSupplierDetails()}
                    <Tab menu={{ pointing: true }} panes={panes} />
                    {this.renderPrintButton()}
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    const order = state.purchaseOrdersPacking[ownPorps.match.params.id]
    const grn = Object.values(state.packingMaterialGrn)
    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        packingMaterials: packingMaterials,
        order: order,
        initialValues: order,
        grn: grn
    };
}
const formWrapped = reduxForm({
    form: 'purchaseOrderPackingGrn'
})(SinglePurchaseOrderPacking);

export default connect(mapStateToProps, { fetchPurchaseOrderPacking, printPurchaseOrderPacking, fetchSuppliers, fetchPackingMaterials, createNewGrnPm, fetchGrnByPurchaseOrderPm, printGrnPm, viewSupplierInvoicePacking })(formWrapped);