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
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                        <div className="ui active centered inline loader"></div>
                    </div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui raised segment" style={{ paddingTop: "20px", paddingLeft: "30px", paddingBottom: "20px" }}>
                        <div className="ui grid">
                            <div className="four wide column" style={{ marginTop: "50px" }}>
                                <h3>Supplier</h3>
                                <div className="ui card">
                                    <div className="image">
                                        <img src={ProfilePic} alt={"supplier profile"} />
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
                                        <div className="ui horizontal label">Contact Numbers</div>
                                        {this.props.supplier.mobileNo1} /   {this.props.supplier.mobileNo2}
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
                                        <div className="ui horizontal label">Credit Period</div>
                                        {this.props.supplier.creditPeriod} (Days)
                                    </div>
                                    <div className="item">
                                        <div className="ui horizontal label">Credit Amount</div>
                                        {this.props.supplier.creditAmount}
                                    </div>
                                    <div className="item">
                                        <div className="ui horizontal label">Currency</div>
                                        {this.props.supplier.currency}
                                    </div>
                                    <div className="item">
                                        <div className="ui horizontal label">Company Address</div>
                                        {this.props.supplier.communicationAddress.no}, {this.props.supplier.communicationAddress.lane}, {this.props.supplier.communicationAddress.city}, {this.props.supplier.communicationAddress.postalCode}, {this.props.supplier.communicationAddress.country}.
                                    </div>
                                </div>
                                <Link to={"/supplier"} className="ui button">Back</Link>
                                <Link to={`/edit-supplier/${this.props.supplier._id}`} className="ui primary button">
                                    Edit
                                </Link>
                                <Link to={`/delete-supplier/${this.props.supplier._id}`} className="ui red button">
                                    Delete
                                </Link>
                            </div>
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
