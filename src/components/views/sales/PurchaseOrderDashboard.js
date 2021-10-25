import React from 'react';
import { Link } from 'react-router-dom'
class PurchaseOrderDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/production-dashboard"} className="ui button">Back</Link>
                        <div className="ui blue buttons">
                            <Link to={"/purchase-order-dashboard-raw"} className="ui button">Purchase Orders RM</Link>
                            <div className="or"></div>
                            <Link to={"/purchase-order-dashboard-packing"} className="ui blue button">Purchase Orders PM</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PurchaseOrderDashboard;