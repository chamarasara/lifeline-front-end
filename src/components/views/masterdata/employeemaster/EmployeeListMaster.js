import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEmployees } from "../../../../actions"

class EmployeeListMaster extends React.Component {
    componentDidMount() {
        this.props.fetchEmployees()
    }

    renderList() {
        return this.props.employee.map(employee => {            
            return (
                <tr key={employee._id}>
                    <td>
                        {employee.employeeNumber}
                    </td>
                    <td>
                        {employee.employeeName}
                    </td>
                    <td>
                        {employee.companyName}
                    </td>
                    <td>
                        {employee.designation}
                    </td>
                    <td>
                        {employee.contactNumber}
                    </td>
                    <td>
                        {employee.employeeStatus}
                    </td>
                    <td>
                        <Link to={`/employee-master-profile/${employee._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>All Employees</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Employee Number</th>
                                <th>Employee Name</th>
                                <th>Company</th>
                                <th>Designation</th>
                                <th>Contact</th>
                                <th>Employee Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {

    const employee = Object.values(state.employee)
    console.log(employee)
    return { employee: employee };
}
export default connect(mapToSatate, { fetchEmployees })(EmployeeListMaster);