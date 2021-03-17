import React from 'react';
import { connect } from 'react-redux';
import ProfilePic from "../../users/elyse.png";
import { Link } from 'react-router-dom';
import { fetchSalary, printSalary } from "../../../../actions";
import moment from "moment";

class SingleSalary extends React.Component {
    componentDidMount() {
        this.props.fetchSalary(this.props.match.params.id)
    }
    onClick = () => {
        this.props.printSalary(this.props.match.params.id)
    }
    getTotalIncome() {
        const totalIncome = this.props.salary.employeeDetails.map(employee => {
            return employee.basicSalary + employee.foodAllowance + employee.vehicleAllowance +
                employee.fuelAllowance + employee.transportAllowance + employee.telephoneAllowance + employee.bonus + (this.props.salary.overTimeHours * this.props.salary.overTimeRate) + this.props.salary.attendanceAllowance
        })
        return totalIncome[0]
    }

    getTotalDeduction() {
        const etf = this.props.salary.employeeDetails.map(employee => {
            return employee.epfEmployee
        })
        const other = this.props.salary.loanRecovery + this.props.salary.stampDuty + this.props.salary.noPay
        return etf[0] + other
    }
    getTotalOtherBenifits() {
        const total = this.props.salary.employeeDetails.map(employee => {
            return employee.insuaranceCost + employee.uniformCost + employee.epfCompany + employee.etfEmployee
        })
        return total[0]
    }
    render() {
        if (!this.props.salary) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <div className="ui grid"> <div className="ui active inline loader"></div></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">
                        <div className="ten wide column" style={{ marginTop: "30px" }}>
                            <div className="ui divided selection list">
                                <div className="item">
                                    <div className="ui horizontal label">Date</div>
                                    {moment(this.props.salary.date).format("DD/MM/YYYYY , h:mm a",)}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Referance Number</div>
                                    {this.props.salary.referanceNumber}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Employee Name</div>
                                    {
                                        this.props.salary.employeeDetails.map(employee => {
                                            return (
                                                <span key={employee.id}>{employee.employeeName}</span>
                                            )
                                        })
                                    }
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Employee Number</div>
                                    {
                                        this.props.salary.employeeDetails.map(employee => {
                                            return (
                                                <span key={employee.id}>{employee.employeeNumber}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="ten wide column" style={{ marginTop: "0px" }}>
                            <table className="ui celled table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th style={{ textAlign: "right" }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Basic Salary</td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.basicSalary}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Fixed Allowances</strong></td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Vehicle Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.vehicleAllowance}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Fuel Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.fuelAllowance}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Transport Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.transportAllowance}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Telephone Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.telephoneAllowance}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Food Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.foodAllowance}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Variable Allowances</strong></td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>OT</span></td>
                                        <td style={{ textAlign: "right" }}>{this.props.salary.overTimeHours * this.props.salary.overTimeRate}</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Bonus</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.bonus}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Attendace Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>{this.props.salary.attendanceAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gross Earnings</strong></td>
                                        <td style={{ textAlign: "right" }}><strong>{this.getTotalIncome()}</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Deductions (-)</strong></td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>EPF 8% Employee</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.epfEmployee}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Loan Recovery</span></td>
                                        <td style={{ textAlign: "right" }}>{this.props.salary.loanRecovery}</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Stamp Duty</span></td>
                                        <td style={{ textAlign: "right" }}>{this.props.salary.stampDuty}</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>No Pay</span></td>
                                        <td style={{ textAlign: "right" }}>{this.props.salary.noPay}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Deductions</strong></td>
                                        <td style={{ textAlign: "right" }}>
                                            <strong>({this.getTotalDeduction()})</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Net Earning</strong></td>
                                        <td style={{ textAlign: "right" }}>
                                            <strong><u>{this.getTotalIncome() - this.getTotalDeduction()}</u></strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Other Benifits</strong></td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Insuarance Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.insuaranceCost}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>Uniform Allowance</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.uniformCost}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>EPF 12% Employer</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.epfCompany}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ paddingLeft: "20px" }}>ETF 3% Employer</span></td>
                                        <td style={{ textAlign: "right" }}>
                                            {
                                                this.props.salary.employeeDetails.map(employee => {
                                                    return (
                                                        <span key={employee.id}>{employee.etfEmployee}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th><strong>Cost to Company</strong></th>
                                        <th style={{ textAlign: "right" }}>
                                            <strong>{this.getTotalIncome() + this.getTotalOtherBenifits()}</strong>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div style={{ paddingTop: "30px" }}>
                        <Link to={"/salaries-dashboard"} className="ui button">
                            Back
                            </Link>
                        <Link to={`/edit-salary/${this.props.salary.id}`} className="ui primary button">
                            Edit
                            </Link>
                        <button type="button" onClick={this.onClick} className="ui primary button">Print</button>
                        <Link to={`/delete-salary/${this.props.salary.id}`} className="ui red button">
                            Delete
                            </Link>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state, ownPorps) => {
    const salary = state.salary[ownPorps.match.params.id]
    return { salary };
}
export default connect(mapToSatate, { fetchSalary, printSalary })(SingleSalary);
