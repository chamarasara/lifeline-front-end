import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchPurchaseOrdersPacking, updatePurchaseOrderRaw } from "../../../../actions"
class ApprovalsPacking extends React.Component {
    componentDidMount() {
        this.props.fetchPurchaseOrdersPacking()
    }   
    renderList() {
        if (!this.props.orders) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.orders.map(order => {
            if (order.order_state === "Pending") {
                return (
                    <div key={order.id} className="card">
                        <div className="content">
                            <div className="header">
                                Order No:{order.orderNumber}
                            </div>
                            <div className="meta">
                                {
                                    order.supplier.map(supplier1 => {
                                        return (
                                            <span key={supplier1.id}>{supplier1.companyName}</span>
                                        )
                                    })
                                }
                            </div>
                            <div className="description">
                                Date: {moment(order.date).format('DD/MM /YYYY,h:mm:a')}<br/>
                                Created by: {order.userName}<br/>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui three buttons">
                                <Link to={`/approvals-single-packing/${order.id}`} className="ui blue button">View</Link>
                            </div>
                        </div>
                    </div>
                )
            } 
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <h3>Pending Purchase Orders PM</h3>
                        <Link to={"/approvals-dashboard"}className="ui button">Back</Link>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <div className="ui cards">
                            {this.renderList()}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapToSatate = (state) => {
    console.log(state.purchaseOrdersRaw)
    const orders = Object.values(state.purchaseOrdersPacking)
    return { orders: orders };
}
export default connect(mapToSatate, { fetchPurchaseOrdersPacking, updatePurchaseOrderRaw })(ApprovalsPacking);