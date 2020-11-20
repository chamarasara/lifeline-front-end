import React from 'react';
import { Link } from 'react-router-dom';
//import PurchaseOrderList from "./PurchaseOrderList";
import SearchPurchaseOrder from "./SearchPurchaseOrderPacking";
import SearchPurchaseOrderByDate from './SearchPurchaseOrderPackingByDate';
import PurchaseOrderSearchResults from './PurchaseOrderPackingSearchResults';

class PurchaseOrderDashboardPacking extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/purchase-order-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-purchase-order-packing"} className="ui blue button">New Purchase Order PM</Link>
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
export default PurchaseOrderDashboardPacking;