import React from 'react'
import { Link } from 'react-router-dom';
import DistributorList from './DistributorList';
class DistributorDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{ paddingTop: "70px", paddingLeft:"30px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/new-distributor"} className="ui blue button">New Distributor</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <DistributorList/>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">

                    </div>
                </div>
            </div>
        )
    }
}
export default DistributorDashboard;