import React from 'react';
import { Link } from 'react-router-dom'
import InvoiceList from "./InvoiceList";
import SearchInvoice from './SearchInvoice';
import SearchInvoiceByDate from './SearchInvoiceByDate';
class InvoiceDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-invoice"} className="ui blue button">New Invoice</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchInvoice />
                        </div>
                        <div className="six wide column">
                            <SearchInvoiceByDate />
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <InvoiceList/>
                    </div>
                </div>
            </div>
        )
    }
}
export default InvoiceDashboard;