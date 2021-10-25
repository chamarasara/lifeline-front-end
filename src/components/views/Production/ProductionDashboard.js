import React from 'react';
import { Link } from 'react-router-dom'
class ProductionDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/purchase-order-dashboard"} className="ui blue button">Purchase Orders</Link>                 
                    </div>                   
                </div>
            </div>
        )
    }
}
export default ProductionDashboard;