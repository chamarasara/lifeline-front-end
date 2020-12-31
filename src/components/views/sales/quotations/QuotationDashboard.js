import React from 'react';
import { Link } from 'react-router-dom'
import SearchQuotation from './SearchQuotation';
import SearchQuotationByDate from './SearchQuotationByDate';
import QuotationSearchResults from './QuotationSearchResults';
class QuotationDashboard extends React.Component {
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/sales-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-quotation"} className="ui blue button">New Quotation</Link>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "30px" }}>
                        <div className="eight wide column">
                            <SearchQuotation/>
                        </div>
                        <div className="six wide column">
                            <SearchQuotationByDate/>
                        </div>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <QuotationSearchResults/>
                    </div>
                </div>
            </div>
        )
    }
}
export default QuotationDashboard;