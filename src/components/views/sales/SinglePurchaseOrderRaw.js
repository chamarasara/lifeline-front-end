import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NewGrnRaw from './NewGrnRaw';
import { fetchPurchaseOrderRaw, printPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, viewSupplierInvoiceRaw } from '../../../actions';

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
                    const price = parseInt(material.unitPrice)
                    return (
                        <p key={material.id}>{this.formatNumber(price.toFixed(2))}</p>
                    )
                })
                }
                </td>
                <td style={{ textAlign: "right" }}> {this.props.order.rawMaterials.map(material => {
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
    renderSupplierDetails() {
       
        return (
            <div className="ui raised segment" style={{paddingTop:"20px", paddingLeft:"30px",paddingBottom:"20px"}}>
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

    onClick = () => {
        this.props.printPurchaseOrderRaw(this.props.order.id)
    }
    viewSupplierInvoice = () => {
        this.props.viewSupplierInvoiceRaw(this.props.order.suplierInvoicePdf)
    }
    renderPrintButton() {
        if (this.props.order.order_state === "Pending") {
            return (
                <div>
                    <Link to={"/purchase-order-dashboard-raw"} type="button" className="ui button">Back</Link>
                    <Link to={`/delete-purchase-order-raw/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        } else if (this.props.order.order_state === "Approved") {
            return (
                <div>
                    <Link to={"/purchase-order-dashboard-raw"} type="button" className="ui button">Back</Link>
                    <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                    <Link to={`/delete-purchase-order-raw/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        }
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    printGrn(id) {
        this.props.printGrnRaw(id)
    }
    getSubTotal() {

        const orderDetails = this.props.order.rawMaterials
        let getTotal = orderDetails.map(data => {
            let totalValue = parseInt(data.unitPrice) * parseInt(data.quantity)
            let total = totalValue
            return this.formatNumber(total.toFixed(2))
        })
        
        let sum = []
        for (let i = 0; i < Math.min(getTotal.length); i++) {
            let total = parseInt(getTotal[i])
            sum[i] =total
        }
        const totalSum = sum.reduce((a, b) => a + b, 0)
        return this.formatNumber(totalSum.toFixed(2))
        
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
            if (!data.rawMaterials || !data.materialDetails) {
                return []
            }
            const grnData = data.rawMaterials.map(material => {
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
            }
            const grnId = data.id
            const total = totalValue.reduce((a, b) => (a + b))

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
                        {this.renderAllGrn()}
                    </div>
                </div>
            )
        }
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
                                <div style={{ paddingLeft: "25px", paddingBottom: "25px", paddingTop: "25px" }}>
                                    <Link onClick={this.viewSupplierInvoice} type="button" className="ui primary button">View Supplier Invoice</Link>
                                </div>
                            </tfoot>
                        </table>
                    </Tab.Pane>
            },
            {
                menuItem: 'GRN Details', render: () =>
                    <Tab.Pane attached={false}>
                        <NewGrnRaw data={this.props.order} />
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
//Form input validation
const validate = (formValues) => {
    const errors = {}
    if (!formValues.invoiceNumber) {
        errors.invoiceNumber = 'Please Enter Supplier Invoice Number';
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
    const packingMaterials = Object.values(state.packingMaterials)
    const order = state.purchaseOrdersRaw[ownPorps.match.params.id]
    const grn = Object.values(state.rawMaterialGrn)
    console.log(order)
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
    form: 'purchaseOrderRawGrn',
    validate: validate
})(SinglePurchaseOrderRaw);

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, printPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, viewSupplierInvoiceRaw })(formWrapped);