import React from 'react';
import { Link } from 'react-router-dom'
class HrDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/employee-dashboard"} className="ui blue button">Employees</Link>
                        <Link to={"/salaries-dashboard"} className="ui blue button">Salaries</Link>
                        <Link to={"/attendance-dashboard"} className="ui blue button">Attendance</Link>                        
                    </div>                   
                </div>
            </div>
        )
    }
}
export default HrDashboard;