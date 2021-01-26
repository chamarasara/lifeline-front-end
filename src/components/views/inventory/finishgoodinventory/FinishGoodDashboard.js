import React from 'react';
import { Link } from 'react-router-dom'
import SearchFinishGoodInventory from './SearchFinishGoodInventory';
import SearchFinishGoodInventoryByDate from './SearchFinishGoodInventoryByDate';
import FinishGoodInventorySearchResults from './FinishGoodInventorySearchResults';

class FinishGoodDashboard extends React.Component {
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <h3>Finish Good-Inventory Dashboard</h3>
                        <Link to={"/inventory-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-finish-good-inventory"} className="ui blue button">New Finish Good</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchFinishGoodInventory />
                        </div>
                        <div className="six wide column">
                            <SearchFinishGoodInventoryByDate />
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <FinishGoodInventorySearchResults />
                    </div>
                </div>
            </div>
        )
    }
}
export default FinishGoodDashboard;