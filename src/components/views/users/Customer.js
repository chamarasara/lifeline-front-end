import React from 'react'
import { Link } from 'react-router-dom';
import CustomerList from './CustomerList';
class Customer extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{ paddingTop: "70px" }}>
                        <Link to={"/new-customer"} className="ui blue button">New Customer</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <CustomerList/>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">

                    </div>
                </div>
            </div>
        )
    }
}
export default Customer;