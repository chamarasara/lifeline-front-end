import React from 'react';
import { connect } from 'react-redux';
import ProfilePic from "../../users/elyse.png";
import { Link } from 'react-router-dom';
import { fetchEmployee } from "../../../../actions";
import moment from "moment";

class EmployeeMasterProfile extends React.Component {
    componentDidMount() {
        this.props.fetchEmployee(this.props.match.params.id)
    }
    render() {
        if (!this.props.employee) {
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                        <div className="ui active inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">
                        <div className="two wide column" style={{ marginTop: "50px" }}>
                            <h3>Employee</h3>
                            <div className="ui card">
                                <div className="image">
                                    <img src={ProfilePic} alt={"customer profile"} />
                                </div>
                            </div>
                        </div>
                        <div className="fourteen wide column" style={{ marginTop: "30px" }}>
                            <div className="ui grid">
                                <div className="eight wide column">
                                    <div className="ui divided selection list">
                                        <div className="item">
                                            <div className="ui horizontal label">Employee Number</div>
                                            {this.props.employee.employeeNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Company Name</div>
                                            {this.props.employee.companyName}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Contact Number</div>
                                            {this.props.employee.contactNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Email</div>
                                            {this.props.employee.email}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Passport/Driving License Number </div>
                                            {this.props.employee.otherIdNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Permenant Address</div>
                                            {this.props.employee.permenantAddress}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Joined Date</div>
                                            {moment(this.props.employee.joinedDate).format('DD/MM/YYYY')}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Date of Confirmation </div>
                                            {moment(this.props.employee.dateOfConfirmation).format('DD/MM/YYYY')}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">EPF Number </div>
                                            {this.props.employee.epfNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Insuarance Policy Number </div>
                                            {this.props.employee.insuarancePolicyNumber}
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide column">
                                    <div className="ui divided selection list">
                                        <div className="item">
                                            <div className="ui horizontal label">Employee Name</div>
                                            {this.props.employee.status} {this.props.employee.employeeName}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Designation</div>
                                            {this.props.employee.designation}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Guardian Number</div>
                                            {this.props.employee.guardianNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">NIC Number</div>
                                            {this.props.employee.idNumber}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Birthday</div>
                                            {moment(this.props.employee.birthDay).format('DD/MM/YYYY')}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Temporary Address</div>
                                            {this.props.employee.temporaryAddress}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Probation Period </div>
                                            {this.props.employee.probationPeriod} (Months)
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">Employee Status </div>
                                            {this.props.employee.employeeStatus}
                                        </div>
                                        <div className="item">
                                            <div className="ui horizontal label">ETF Number </div>
                                            {this.props.employee.etfNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingTop: "30px" }}>
                                <Link to={"/employee-master-dashboard"} className="ui button">
                                    Back
                            </Link>
                                <Link to={`/edit-master-employee/${this.props.employee._id}`} className="ui primary button">
                                    Edit
                            </Link>
                                <Link to={`/delete-master-employee/${this.props.employee._id}`} className="ui red button">
                                    Delete
                            </Link>
                            </div>
                        </div>
                    </div>
                    <div className="ui grid">
                        <div className="two wide column">
                        </div>
                        <div className="ten wide column">
                            <table className="ui celled table">
                                <thead>
                                    <tr><th>Description</th>
                                        <th style={{ textAlign: "right" }}>Amount</th>
                                    </tr></thead>
                                <tbody>
                                    <tr>
                                        <td data-label="description">Basic Salary</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.basicSalary}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Vehicle Allowance</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.vehicleAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Fuel Allowance</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.fuelAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Transport Allowance</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.transportAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Telephone Allowance</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.telephoneAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Food Allowance</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.foodAllowance}</td>
                                    </tr>
                                    <tr>
                                        <td data-label="description">Bonus</td>
                                        <td data-label="amount" style={{ textAlign: "right" }}>{this.props.employee.bonus}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <Link to={`/assign-allowances-master/${this.props.employee._id}`} className="ui primary button">
                                Assign Allowances
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state, ownPorps) => {
    const employee = state.employee[ownPorps.match.params.id]
    return { employee };
}
export default connect(mapToSatate, { fetchEmployee })(EmployeeMasterProfile);
