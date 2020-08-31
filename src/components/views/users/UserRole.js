import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserRole, fetchUsersRoles } from "../../../actions"

import './user.css';

class UserRole extends React.Component {

    componentDidMount() {
        //this.props.fetchUsersRoles()
        this.props.fetchUserRole(this.props.match.params.id)
    }
    renderPermissions(){
        const permissions = [];
        console.log(this.props.userRole)
        if (this.props.userRole.inventory===true) {
            permissions.push("Inventory")
        }
        if (this.props.userRole.accounting === true) {
            permissions.push("Accounting")
        }
        if (this.props.userRole.sales === true) {
            permissions.push("Sales")
        }
        if (this.props.userRole.production === true) {
            permissions.push("Production")
        }
        if (this.props.userRole.costing === true) {
            permissions.push("Costing")
        }
        if (this.props.userRole.hr === true) {
            permissions.push("HR")
        }
        if (this.props.userRole.quality === true) {
            permissions.push("Quality")
        }
        console.log(permissions)
        
        return permissions;
        
    }
    renderPermissionsList(){
        const permissionList = this.renderPermissions();
        const listItems = permissionList.map((list) =>
            <li key={Math.random()}>{list}</li>
        )
        return listItems;
    }
    render() {
        if (!this.props.userRole) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }
        console.log(this.props.userRole.inventory)
        return (
            <div className="pusher">
                <div className="ui basic segment" id="user-role">
                    <div className="ui cards">
                        <div className="card">
                            <div className="content" style={{marginLeft:"30px",marginTop:"20px", marginBottom:"20px" }}>
                                <div className="header">{this.props.userRole.userTypename}</div>
                                <div className="meta">{this.props.userRole.userTypeCode}</div>
                                <div className="description">
                                    Permissions:
                                   <ol className="ui ordered list">
                                        {this.renderPermissionsList()}
                                    </ol>
                                    <div className="ui buttons">
                                        <Link to={`/edit-user-role/${this.props.match.params.id}`} className="ui blue button">Edit</Link>
                                        <div className="or"></div>
                                        <Link to={`/delete-user-role/${this.props.match.params.id}`} className="ui red button">Delete</Link>
                                    </div>
                                </div>
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
    return { userRole: state.userRoles[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchUserRole, fetchUsersRoles })(UserRole);