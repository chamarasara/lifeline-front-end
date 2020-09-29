import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, fetchUserRole } from '../../../actions';

class UserProfile extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params._id)
        this.props.fetchUserRole(this.props.match.params.id)
    }
    renderUserType() {
        if (!this.props.userRole) {
            return<div>Something went wrong</div>
        }
        return(
            <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                <div className="ui horizontal label">User Role</div>
                {this.props.userRole.userTypeName}
            </Link>
        )
    }
    render() {
        if (!this.props.user) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="ui grid">
                        <div className="four wide column" style={{ marginTop: "50px" }}>
                            <div className="ui card">
                                <div className="image">
                                    <img src={this.props.user.avatar} alt={"user profile"} />
                                </div>
                            </div>
                        </div>
                        <div className="ten wide column" style={{ marginTop: "30px" }}>
                            <div className="ui divided selection list">
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Full Name</div>
                                    {this.props.user.firstName} {this.props.user.lastName}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Contact Number</div>
                                    {this.props.user.mobileNo}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">NIC</div>
                                    {this.props.user.nic}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Email</div>
                                    {this.props.user.email}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Birthday</div>
                                    {this.props.user.birthDay}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Gender</div>
                                    {this.props.user.gender}
                                </Link>
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Address</div>
                                    {this.props.user.address.no}, {this.props.user.address.lane}, {this.props.user.address.city}, {this.props.user.address.country}, {this.props.user.address.postalCode}
                                </Link>
                                {this.renderUserType()}
                                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="item">
                                    <div className="ui horizontal label">Username</div>
                                    {this.props.user.userName}
                                </Link>
                            </div>
                            <Link to={`/employee`} className="ui button">
                                Back
                            </Link>
                            <Link to={`/edituser/${this.props.user._id}/${this.props.match.params.id}`} className="ui primary button">
                                Edit
                            </Link>
                            <Link to={`/delete-user/${this.props.match.params._id}/${this.props.match.params.id}`} className="ui red button">
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
    return { user: state.users[ownPorps.match.params._id], userRole: state.userRoles[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchUser, fetchUserRole })(UserProfile);