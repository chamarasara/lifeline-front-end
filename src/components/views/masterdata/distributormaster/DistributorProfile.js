import React from 'react';
import { connect } from 'react-redux';
import ProfilePic from "../../users/elyse.png";
import { Link } from 'react-router-dom';
import { fetchDistributor } from "../../../../actions";

class DistributorProfile extends React.Component {
    componentDidMount() {
        this.props.fetchDistributor(this.props.match.params.id)
    }
    render() {
        if (!this.props.distributor) {
            return <div><div className="ui active inline loader"></div></div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">
                        <div className="four wide column" style={{ marginTop: "50px" }}>
                            <h3>Distributor</h3>
                            <div className="ui card">
                                <div className="image">
                                    <img src={ProfilePic} alt={"customer profile"} />
                                </div>
                            </div>
                        </div>
                        <div className="twelve wide column" style={{ marginTop: "30px" }}>
                            <div className="ui divided selection list">
                                <div className="item">
                                    <div className="ui horizontal label">Distributor Code</div>
                                    {this.props.distributor.distributorCode}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Company Name</div>
                                    {this.props.distributor.companyName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Contact Person Name Name</div>
                                    {this.props.distributor.distributorName}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Contact Numbers</div>
                                    {this.props.distributor.mobileNo1} / {this.props.distributor.mobileNo2}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Registration Number</div>
                                    {this.props.distributor.registerNo}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Email</div>
                                    {this.props.distributor.email}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Fax</div>
                                    {this.props.distributor.fax}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Credit Period</div>
                                    {this.props.distributor.creditPeriod}(Days)
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Credit Amount</div>
                                    {this.props.distributor.creditAmount}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Currency</div>
                                    {this.props.distributor.currency}
                                </div>
                                <div className="item">
                                    <div className="ui horizontal label">Company Address</div>
                                    {this.props.distributor.communicationAddress.no},
                                    {this.props.distributor.communicationAddress.lane},
                                    {this.props.distributor.communicationAddress.city},
                                    {this.props.distributor.communicationAddress.country},
                                    {this.props.distributor.communicationAddress.postalCode}
                                </div>
                                <div className="item">
                                    <h5>Products Allocated</h5>
                                    <ol className="ui list">
                                        {
                                            this.props.distributor.productsList.map(product=>{
                                                return(
                                                    <li key={product.id} className="item">{product.productName}</li>
                                                )
                                            })
                                        }
                                    </ol>
                                </div>
                            </div>
                            <Link to={"/distributor-dashboard"} className="ui button">
                                Back
                            </Link>
                            <Link to={`/edit-distributor/${this.props.distributor.id}`} className="ui primary button">
                                Edit
                            </Link>
                            <Link to={`/delete-distributor/${this.props.distributor.id}`} className="ui red button">
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
    return { distributor: state.distributor[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchDistributor })(DistributorProfile);
