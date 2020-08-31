import React from 'react';
import { connect } from 'react-redux';
import ProfilePic from "./elyse.png";
import { Link } from 'react-router-dom';
import { fetchSupplier } from "../../../actions";

class SupplierProfile extends React.Component {
    componentDidMount() {
        this.props.fetchSupplier(this.props.match.params.id)
    }
    render() {
        if (!this.props.supplier) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">                    
                        <div className="four wide column" style={{ marginTop: "50px" }}>
                            <h3>Supplier</h3>
                            <div className="ui card">
                                <div className="image">
                                    <img src={ProfilePic} alt={"supplier profile"}/>
                                </div>
                            </div>
                        </div>
                        <div className="ten wide column" style={{ marginTop: "30px" }}>
                            <div className="ui divided selection list">
                                <div className="item">
                                    <div className="ui horizontal label">Full Name</div>
                                    {this.props.supplier.supplierName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Contact Number</div>
                                    {this.props.supplier.mobileNo}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Registration Number</div>
                                    {this.props.supplier.registerNo}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Email</div>
                                    {this.props.supplier.email}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Fax</div>
                                    {this.props.supplier.fax}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Company Name</div>
                                    {this.props.supplier.companyName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Currency</div>
                                    {this.props.supplier.currency}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Credit Period</div>
                                    {this.props.supplier.creditPeriod}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Coummunication Address</div>
                                    {this.props.supplier.communicationAddress.no}, {this.props.supplier.communicationAddress.lane}, {this.props.supplier.communicationAddress.city}, {this.props.supplier.communicationAddress.postalCode}, {this.props.supplier.communicationAddress.country}.
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Coummunication Address</div>
                                    {this.props.supplier.registerAddress.no}, {this.props.supplier.registerAddress.lane}, {this.props.supplier.registerAddress.city}, {this.props.supplier.registerAddress.postalCode}, {this.props.supplier.registerAddress.country}.
                                </div>
                            </div>
                            <Link to={`/edit-supplier/${this.props.supplier.id}`} className="ui primary button">
                                Edit
                            </Link>
                            <Link to={`/delete-supplier/${this.props.supplier.id}`} className="ui red button">
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
    return { supplier: state.supplier[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchSupplier })(SupplierProfile);
