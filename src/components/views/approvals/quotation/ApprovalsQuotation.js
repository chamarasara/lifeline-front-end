import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchQuotations, updateQuotation } from "../../../../actions"
class Quotation extends React.Component {
    componentDidMount() {
        this.props.fetchQuotations()
    }
    renderList() {
        if (!this.props.quotations) {
            return (
                <div>
                    <p>Loading.....</p>
                </div>
            )
        }
        return this.props.quotations.map(quotation => {
            console.log(quotation)
            if (quotation.quotation_state === "Pending") {
                return (
                    <div key={quotation.id} className="card">
                        <div className="content">
                            <div className="header">
                                Quotation No:{quotation.quotationNumber}
                            </div>
                            <div className="meta">
                                {
                                    quotation.customerDetails.map(custome1 => {
                                        return (
                                            <span key={custome1.id}>{custome1.companyName}</span>
                                        )
                                    })
                                }
                            </div>
                            <div className="description">
                                Date: {moment(quotation.date).format('DD/MM /YYYY,h:mm:a')}<br/>
                                Created by: {quotation.userName}<br/>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui three buttons">
                                <Link to={`/approvals-single-quotation/${quotation.id}`} className="ui blue button">View</Link>
                            </div>
                        </div>
                    </div>
                )
            } 
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <h3>Pending Quotations</h3>
                        <Link to={"/approvals-dashboard"} className="ui button">Back</Link>
                    </div>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <div className="ui cards">
                            {this.renderList()}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapToSatate = (state) => {
    console.log(state.quotations)
    const quotations = Object.values(state.quotations)
    return { quotations: quotations };
}
export default connect(mapToSatate, { fetchQuotations, updateQuotation })(Quotation);