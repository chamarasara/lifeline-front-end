import React from 'react';
import { Link } from 'react-router-dom'
class InventoryDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/finish-good-inventory-dashboard"} className="ui blue button">Finish Goods</Link>
                        <Link to={"/purchase-order-dashboard"} className="ui blue button">Semi Finish Goods</Link>
                        <Link to={"/raw-material-inventory-dashboard"} className="ui blue button">Raw Material</Link>
                        <Link to={"/quotation-dashboard"} className="ui blue button">Packing Material</Link>
                    </div>                   
                </div>
            </div>
        )
    }
}
export default InventoryDashboard;