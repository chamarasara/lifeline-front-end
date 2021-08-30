import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrderPacking, updatePurchaseOrderStatePacking, viewSupplierInvoicePacking } from '../../../../actions';

class ApprovalsSingleOrderPacking extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id)
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
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
        this.props.updatePurchaseOrderStatePacking(this.props.order._id, { ...formValues, order_state })
    }
    viewSupplierInvoice = () => {
        this.props.viewSupplierInvoicePacking(this.props.order.suplierInvoicePdf)
    }
    render() {
        if (!this.props.order) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <div className="ui active centered inline loader"></div>
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
                        <Link to={"/approvals-packing"} type="button" className="ui button">Back</Link>
                        <button type="button" onClick={this.onClick} className="ui primary button">Approve</button>
                        <Link to={`/approvals-edit-packing/${this.props.order.id}`} type="button" className="ui black button">Edit</Link>
                        <Link to={`/approvals-delete-packing/${this.props.match.params.id}`} type="button" className="ui red button">Decline</Link>
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownPorps) => {
    const order = state.purchaseOrdersPacking[ownPorps.match.params.id]
    return {
        order: order
    };
}


export default connect(mapStateToProps, { fetchPurchaseOrderPacking, updatePurchaseOrderStatePacking, viewSupplierInvoicePacking })(ApprovalsSingleOrderPacking);