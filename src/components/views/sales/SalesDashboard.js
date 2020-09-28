import React from 'react';
import { Link } from 'react-router-dom'
class SalesDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <div className="ui blue buttons">
                            <Link to={"/purchase-order-dashboard"} className="ui button">Purchase Orders</Link>
                            <div className="or"></div>
                            <Link to={"/invoice-dashboard"} className="ui blue button">Invoices</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SalesDashboard;