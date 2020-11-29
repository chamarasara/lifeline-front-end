import React from 'react';
import { connect } from 'react-redux';
import ProfilePic from "./elyse.png";
import { Link } from 'react-router-dom';
import { fetchCustomer } from "../../../actions";

class CustomerProfile extends React.Component {
    componentDidMount() {
        this.props.fetchCustomer(this.props.match.params.id)
    }
    render() {
        if (!this.props.customer) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">
                        <div className="four wide column" style={{ marginTop: "50px" }}>
                            <h3>Customer</h3>
                            <div className="ui card">
                                <div className="image">
                                    <img src={ProfilePic} alt={"customer profile"}/>
                                </div>
                            </div>
                        </div>
                        <div className="twelve wide column" style={{ marginTop: "30px" }}>
                            <div className="ui divided selection list">
                                <div className="item">
                                    <div className="ui horizontal label">Full Name</div>
                                    {this.props.customer.customerName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Contact Numbers</div>
                                    {this.props.customer.mobileNo1} / {this.props.customer.mobileNo2}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Registration Number</div>
                                    {this.props.customer.registerNo}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Email</div>
                                    {this.props.customer.email}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Fax</div>
                                    {this.props.customer.fax}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Company Name</div>
                                    {this.props.customer.companyName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Currency</div>
                                    {this.props.customer.currency}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Coummunication Address</div>
                                    {this.props.customer.communicationAddress.no}, {this.props.customer.communicationAddress.lane}, {this.props.customer.communicationAddress.city}, {this.props.customer.communicationAddress.postalCode}, {this.props.customer.communicationAddress.country}.
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Coummunication Address</div>
                                    {this.props.customer.registerAddress.no2}, {this.props.customer.registerAddress.lane2}, {this.props.customer.registerAddress.city2}, {this.props.customer.registerAddress.postalCode2}, {this.props.customer.registerAddress.country}.
                                </div>
                            </div>
                            <Link to={"/customer"} className="ui button">
                                Back
                            </Link>
                            <Link to={`/edit-customer/${this.props.customer._id}`} className="ui primary button">
                                Edit
                            </Link>
                            <Link to={`/delete-customer/${this.props.customer._id}`} className="ui red button">
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state, ownPorps) => {
    console.log(state)
    return { customer: state.customer[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchCustomer })(CustomerProfile);
