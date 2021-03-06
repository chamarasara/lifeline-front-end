import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { fetchPurchaseOrderRaw, printPurchaseOrderRaw, fetchSuppliers, fetchRawMaterials, createPurchaseOrderRaw, editPurchaseOrderRaw, updatePurchaseOrderRaw } from '../../../../actions';

class ApprovalsSingleOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id)       
    }
    renderPurchaseOrederDetails() {
        return (
            <tr>
                <td>
                    {this.props.order.rawMaterialsList.map(material => {
                        return (
                            <p key={material.id}>{material.materialCode}</p>
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


            </tr>
        )

    }
    renderSupplierDetails() {
        console.log(this.props.order.supplier)
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
        this.props.updatePurchaseOrderRaw(this.props.order._id, {...formValues, order_state})
    }
    onSubmit = (formValues) => {
        this.props.editPurchaseOrderRaw(this.props.order._id, formValues)
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
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const packingMaterials = Object.values(state.packingMaterials)
    const order = state.purchaseOrdersRaw[ownPorps.match.params.id]
    //console.log(state.purchaseOrders[ownPorps.match.params.id])
    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        packingMaterials: packingMaterials,
        order: order,
        initialValues: order
    };
}
const formWrapped = reduxForm({
    form: 'purchaseOrderRawPayments',
})(ApprovalsSingleOrderRaw);

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, updatePurchaseOrderRaw, editPurchaseOrderRaw })(formWrapped);