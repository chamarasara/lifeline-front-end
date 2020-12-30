import React from 'react';
import { Link } from 'react-router-dom'
class ApprovalsDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/approvals-raw"} className="huge ui blue button">Purchase Orders RM</Link>
                        <Link to={"/approvals-packing"} className="huge ui blue button">Purchase Orders PM</Link>
                        <Link to={"/approvals-quotations"} className="huge ui blue button">Quotations</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default ApprovalsDashboard;