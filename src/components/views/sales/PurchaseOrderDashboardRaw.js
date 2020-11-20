import React from 'react';
import { Link } from 'react-router-dom';
//import PurchaseOrderList from "./PurchaseOrderList";
import SearchPurchaseOrder from "./SearchPurchaseOrderRaw";
import SearchPurchaseOrderByDate from './SearchPurchaseOrderRawByDate';
import PurchaseOrderSearchResults from './PurchaseOrderRawSearchResults';

class PurchaseOrderDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/purchase-order-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-purchase-order-raw"} className="ui blue button">New Purchase Order RM</Link>
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
                        <PurchaseOrderSearchResults />
                    </div>
                </div>
            </div>
        )
    }
}
export default PurchaseOrderDashboard;