import React from 'react'
import { Link } from 'react-router-dom'

import UsersList from './UsersList';
import UserRolesList from './UserRolesList'
class Employee extends React.Component{

    render(){
        return(
            <div className="pusher"> 
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{paddingTop:"70px"}}>
                    <div className="ui blue buttons">
                            <Link to={"/createuser"} className="ui button">New User</Link>
                        <div className="or"></div>
                            <Link to={"/createuserrole"} className="ui blue button">New User Role</Link>
                    </div>
                    </div>
                </div>         
                <div className="ui grid">                    
                    <div className="sixteen wide column"></div>
                    <UserRolesList/>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column">
                        <UsersList />
                    </div>
                </div>
            </div>
        )
    }
}
export default Employee;