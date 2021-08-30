import React from 'react';
import { Link } from 'react-router-dom'
import SearchRawMaterialInventory from './SearchRawMaterialInventory';
// import SearchFinishGoodInventoryByDate from './SearchFinishGoodInventoryByDate';


class RawMaterialInventoryDashboard extends React.Component {
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <h3>Raw Material Inventory Dashboard</h3>
                        <Link to={"/inventory-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-grn-raw-inventory"} className="ui blue button">New GRN </Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <SearchRawMaterialInventory />
                    </div>
                </div>
            </div>
        )
    }
}
export default RawMaterialInventoryDashboard;