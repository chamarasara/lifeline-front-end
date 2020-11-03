import React from 'react';
import { Link } from 'react-router-dom';
import PurchaseOrderList from "./PurchaseOrderList";
import SearchPurchaseOrder from "./SearchPurchaseOrder";
import SearchPurchaseOrderByDate from './SearchPurchaseOrderByDate';

class PurchaseOrderDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-purchase-order"} className="ui blue button">New Purchase Order</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchPurchaseOrder />
                        </div>
                        <div className="six wide column">
                            <SearchPurchaseOrderByDate />
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <PurchaseOrderList />
                    </div>
                </div>
            </div>
        )
    }
}
export default PurchaseOrderDashboard;