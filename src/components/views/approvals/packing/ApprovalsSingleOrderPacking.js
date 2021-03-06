import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrderPacking, updatePurchaseOrderPacking } from '../../../../actions';

class ApprovalsSingleOrderPacking extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.fetchPurchaseOrderPacking(this.props.match.params.id)
    }
    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.packingMaterialsList.map(material => {
                        return (
                            <p key={material.id}>{material.materialCode}</p>
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
    onClick = () => {
        const formValues = {}
        const order_state = "Approved"
        this.props.updatePurchaseOrderPacking(this.props.order._id, { ...formValues, order_state })
    }
    render() {
        if (!this.props.order) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <p>Loading....</p>
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPurchaseOrederDetails()}
                        </tbody>
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
//Form input validation
// const validate = (formValues) => {
//     const errors = {}
//     if (!formValues.firstName) {
//         errors.firstName = 'Please enter First Name';
//     }
//     if (!formValues.lastName) {
//         errors.lastName = 'Please enter Last Name';
//     }
//     if (!formValues.address) {
//         errors.address = 'Please enter the Number of the Address';
//     }
//     if (!formValues.nic) {
//         errors.nic = 'Please enter the ID Nummber';
//     }
//     if (!formValues.mobileNo) {
//         errors.mobileNo = 'Please enter Phone Number';
//     }
//     if (!formValues.email) {
//         errors.email = 'Please enter Email';
//     }
//     if (!formValues.gender) {
//         errors.gender = 'Please enter the Gender';
//     }
//     return errors;
// }
const mapStateToProps = (state, ownPorps) => {
    const order = state.purchaseOrdersPacking[ownPorps.match.params.id]
    //console.log(state.purchaseOrders[ownPorps.match.params.id])
    return {
        order: order
    };
}


export default connect(mapStateToProps, { fetchPurchaseOrderPacking, updatePurchaseOrderPacking })(ApprovalsSingleOrderPacking);