import React from 'react';
import { Link } from 'react-router-dom'
import InvoiceList from "./InvoiceList";
class InvoiceDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-invoice"} className="ui blue button">New Invoice</Link>
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