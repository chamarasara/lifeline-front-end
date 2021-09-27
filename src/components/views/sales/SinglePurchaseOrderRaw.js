import React from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NewGrnRaw from './NewGrnRaw';
import { fetchPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, printPurchaseOrderRaw } from '../../../actions';

class SinglePurchaseOrderRaw extends React.Component {

    componentDidMount() {
        this.props.fetchPurchaseOrderRaw(this.props.match.params.id)
        this.props.fetchGrnByPurchaseOrder(this.props.match.params.id)
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
    printGrn(id) {
        this.props.printGrnRaw(id)
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
        const subtotal = totalSum.map(sum=>{
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
        if (!this.props.order) {
            return (
                <div>
                    <h4>No any GRN found</h4>
                </div>
            )
        }
        return this.props.order.grnDetails.map(data => {

            let grn = this.props.order.grnDetails
            const array = []
            const totalArray = data.data.map(data => {
                console.log(data)
                let total = data.unitPrice * data.quantity
                console.log(total)

                for (let i = 0; i < array.length; i++) {
                    array[i] = data.unitPrice * data.quantity


                }
                return total
            })

            console.log(array)
            const total = grn.map(data => {
                console.log(data)
                return data.data.map(data => {
                    // console.log(data.unitPrice * data.quantity)
                    let total = data.unitPrice * data.quantity
                    console.log(data.unitPrice)
                    return total
                })
            })

            console.log(totalArray)
            console.log(total)
            let totalSum = total.map(arr => arr.reduce((sum, item) => sum += item, 0))
            const subtotal1 = totalSum.map(sum => {
                console.log(sum)
                return sum
            })
            console.log(totalSum)
            const subtotal = subtotal1.map(subtotal => {
                return (
                    <tr colSpan="16">
                        <th colSpan="5" style={{ textAlign: "right" }}>Subtotal</th>
                        <th colSpan="8" style={{ textAlign: "right" }}>{subtotal}</th>
                    </tr>
                )
            })

            return (

                <table key={Math.random()} className="ui small blue striped celled table" style={{ marginTop: "20px" }}>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="8">
                                <tr><h4 style={{ color: "red" }}>GRN</h4></tr>
                                <tr><p>Date-{moment(data.date).format('DD MM YYYY, h:mm A')}</p></tr>
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
                                    console.log(data)
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
                                    const price =Number(data.unitPrice)
                                    const quantity = data.quantity
                                    const total = price * quantity
                                    return (
                                        <p key={Math.random()}>{total}</p>
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
                        <NewGrnRaw data={this.props.order} />
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
                            <div>
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
            }
        ]
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <h3>Order No #{this.props.order.orderNumber}</h3>
                    {this.renderSupplierDetails()}
                    <Tab menu={{ pointing: true }} panes={panes} />
                    <div style={{ paddingTop: "30px" }}>
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

const mapStateToProps = (state, ownPorps) => {
    const suppliers = Object.values(state.supplier)
    const rawMaterials = Object.values(state.rawMaterials)
    const order = state.purchaseOrdersRaw[ownPorps.match.params.id]
    const grn = Object.values(state.rawMaterialGrn)
    return {
        errorMessage: state,
        suppliers: suppliers,
        rawMaterials: rawMaterials,
        order: order,
        initialValues: order,
        grn: grn
    };
}
const formWrapped = reduxForm({
    form: 'purchaseOrderRawGrn'
})(SinglePurchaseOrderRaw);

export default connect(mapStateToProps, { fetchPurchaseOrderRaw, createNewGrn, fetchGrnByPurchaseOrder, printGrnRaw, printPurchaseOrderRaw })(formWrapped);