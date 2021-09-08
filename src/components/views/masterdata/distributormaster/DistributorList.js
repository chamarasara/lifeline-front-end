import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDistributors } from "../../../../actions"
class DistributorList extends React.Component {
    componentDidMount() {
        this.props.fetchDistributors()
    }

    renderList() {
        return this.props.distributors.map(distributor => {
            console.log(distributor.id)
            return (
                <tr key={distributor._id}>
                    <td>
                        {distributor.distributorCode}
                    </td>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                {distributor.companyName}
                                <div className="sub header">{distributor.distributorName}
                                </div>
                            </div>
                        </h4></td>
                    <td>
                        {distributor.mobileNo1}<br />
                        {distributor.email}
                    </td>
                    <td>
                        {distributor.productsList.map(product => {
                            return (
                                    <span key={Math.random()}>{product.productName}. </span> 
                            )
                        })}
                    </td>
                    <td>
                        {distributor.areas.map(area => {
                            return (
                                <span key={Math.random()}>{area.city}. </span>
                            )
                        })}
                    </td>
                    <td>
                        <Link to={`/distributor-profile/${distributor.id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="ui raised segment" style={{ paddingTop: "30px", paddingLeft: "30px", paddingBottom: "20px", paddingRight: "30px" }}>
                        <table className="ui very basic collapsing celled table">
                            <thead>
                                <tr>
                                    <th>Distributor Code</th>
                                    <th>Distributor Name</th>
                                    <th>Contact Details</th>
                                    <th>Products</th>
                                    <th>Areas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {

    const distributors = Object.values(state.distributor)
    console.log(state.distributor)
    return { distributors: distributors };
}
export default connect(mapToSatate, { fetchDistributors })(DistributorList);