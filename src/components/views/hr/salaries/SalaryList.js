import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSalaries } from "../../../../actions"

class SalaryList extends React.Component {
    componentDidMount() {
        this.props.fetchSalaries()
    }

    renderList() {
        return this.props.salary.map(salary => {
            return (
                <tr key={salary._id}>
                    <td>
                        {moment(salary.date).format("DD/MM/YYYYY , h:mm",)}
                    </td>
                    <td>
                        {salary.referanceNumber}
                    </td>
                    <td>
                        {
                            salary.employeeDetails.map(employee => {
                                return (
                                    <span key={employee.id}>{employee.employeeNumber}</span>
                                )
                            }
                            )
                        }
                    </td>
                    <td>
                        {
                            salary.employeeDetails.map(employee => {
                                return (
                                    <span key={employee.id}>{employee.employeeName}</span>
                                )
                            }
                            )
                        }
                    </td>
                    <td style={{ textAlign: "right" }}>
                        {salary.basicSalary}
                    </td>
                    <td>
                        <Link to={`/single-salary/${salary.id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        if (this.props.salary.length <= 0) {
            return (
                <div>
                    <p>No Records found!</p>
                </div>
            )
        }
        return (
            <div>
                <div>
                    <h4>All Records</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Ref Number</th>
                                <th>Employee Number</th>
                                <th>Employee Name</th>
                                <th>Basic Salary</th>                                
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
    const salary = Object.values(state.searchSalary)
    return { salary: salary.reverse() };
}
export default connect(mapToSatate, { fetchSalaries })(SalaryList);