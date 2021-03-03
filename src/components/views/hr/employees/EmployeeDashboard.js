import React from 'react'
import { Link } from 'react-router-dom';
import EmployeeList from './EmployeeList';

class EmployeeDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{ paddingTop: "70px" }}>
                        <Link to={"/hr-dashboard"} className="ui button">Back</Link>
                        <Link to={"/new-employee"} className="ui blue button">New Employee</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <EmployeeList/>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">

                    </div>
                </div>
            </div>
        )
    }
}
export default EmployeeDashboard;