import React from 'react';
import { Link } from 'react-router-dom'
import SearchReturnInvoice from './SearchReturnInvoice';
import SearchReturnInvoiceByDate from './SearchReturnInvoiceByDate';
 import ReturnInvoiceSearchResults from './ReturnInvoiceSearchResults';
class ReturnInvoiceDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchReturnInvoice />
                        </div>
                        <div className="six wide column">
                            <SearchReturnInvoiceByDate />
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <ReturnInvoiceSearchResults/>
                    </div>
                </div>
            </div>
        )
    }
}
export default ReturnInvoiceDashboard;