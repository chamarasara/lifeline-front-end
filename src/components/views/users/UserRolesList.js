import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsersRoles } from "../../../actions"
class UserRolesList extends React.Component {
    componentDidMount() {
        this.props.fetchUsersRoles()
    }

    renderList() {
        return this.props.userRoles.map(userRoles => {
            return (
                <div className="item">
                    <i className="large user icon middle aligned icon"></i>
                <div className="content" key={userRoles.id}>
                        <Link to={`/user-role/${userRoles.id}`} className="header">{userRoles.userTypename}</Link>
                        <div className="description">{userRoles.userTypeCode}</div>
                </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>User Roles</h4>
                    <div className="ui relaxed divided list">                        
                        {this.renderList()}
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {
    
    const userRoles = Object.values(state.userRoles)
    console.log(userRoles)
    return { userRoles: userRoles };
}
export default connect(mapToSatate, { fetchUsersRoles })(UserRolesList);