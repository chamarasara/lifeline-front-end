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
                        {distributor.mobileNo1}
                    </td>
                    <td>
                        {distributor.mobileNo2}
                    </td>
                    <td>
                        {distributor.fax}
                    </td>
                    <td>
                        {distributor.email}
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
                    <h4>All Distributors</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Distributor Code</th>
                                <th>Distributor Name</th>
                                <th>Contact Number 1</th>
                                <th>Contact Number 2</th>
                                <th>Fax</th>
                                <th>Email</th>
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

    const distributors = Object.values(state.distributor)
    console.log(state)
    return { distributors: distributors };
}
export default connect(mapToSatate, { fetchDistributors })(DistributorList);