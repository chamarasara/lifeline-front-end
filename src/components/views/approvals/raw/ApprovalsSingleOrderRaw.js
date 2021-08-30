import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrderRaw, editPurchaseOrderRaw, updatePurchaseOrderStateRaw, viewSupplierInvoiceRaw } from '../../../../actions';

class ApprovalsSingleOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id)       
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.rawMaterialsList.map(material => {
                        console.log(material)
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
                <p><strong>Date: </strong>{moment(this.props.order.date).format('DD/MM/YYYY')}
                </p>
                <p>
                    <strong>Order State:</strong> {this.props.order.order_state}
                </p>
            </div>
        )

    }
    onClick = () => {
        const formValues = {}   
        const order_state = "Approved"
        this.props.updatePurchaseOrderStateRaw(this.props.order._id, {...formValues, order_state})
    }
    viewSupplierInvoice = () => {
        this.props.viewSupplierInvoiceRaw(this.props.order.suplierInvoicePdf)
    }
    onSubmit = (formValues) => {
        this.props.editPurchaseOrderRaw(this.props.order._id, formValues)
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
            sum[i] = total
        }
        const totalSum = sum.reduce((a, b) => a + b, 0)
        return this.formatNumber(totalSum.toFixed(2))

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
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Order No #{this.props.order.orderNumber}</h3>
                    {this.renderSupplierDetails()}
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
                    <div>
                        <Link to={"/approvals-raw"} type="button" className="ui button">Back</Link>
                        <button type="button" onClick={this.onClick} className="ui primary button">Approve</button>
                        <Link to={`/approvals-edit-raw/${this.props.order.id}`} type="button" className="ui black button">Edit</Link>
                        <Link to={`/approvals-delete-raw/${this.props.match.params.id}`} type="button" className="ui red button">Decline</Link>
                    </div>
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
    const order = state.purchaseOrdersRaw[ownPorps.match.params.id]
    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        order: order,
        initialValues: order
    };
}

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, updatePurchaseOrderStateRaw, editPurchaseOrderRaw, viewSupplierInvoiceRaw })(ApprovalsSingleOrderRaw);