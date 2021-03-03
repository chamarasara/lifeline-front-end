import React from 'react'
import { Link } from 'react-router-dom';
import EmployeeListMaster from './EmployeeListMaster';

class EmployeeMasterDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{ paddingTop: "70px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <EmployeeListMaster/>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">

                    </div>
                </div>
            </div>
        )
    }
}
export default EmployeeMasterDashboard;