import React from 'react';
import { Link } from 'react-router-dom'
import BankAccountsList from "./BankAccountsList";
class BankAccountsDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px", paddingLeft: "10px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/create-bank-account"} className="ui blue button">New Bank Account</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <BankAccountsList />
                    </div>
                </div>
            </div>
        )
    }
}
export default BankAccountsDashboard;