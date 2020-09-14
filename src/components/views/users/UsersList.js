import React from 'react';
import { connect } from 'react-redux';
import ProfilePic1 from "./kapila.jpeg";
import { Link } from 'react-router-dom';
import './user.css';
import {fetchUsers} from '../../../actions';


class UsersList extends React.Component {
    componentDidMount(){
        this.props.fetchUsers()
    }
    renderList() {
        if (!this.props.users) {
            return <div className="ui active inline loader"></div>
        }
        return this.props.users.map(users => {
            return (
                <div className="column">
                    <Link to={`/userprofile/${users.id}`} className="ui link fluid card">
                        <div className="image">
                            <img src={ProfilePic1} alt={"user profile"}/>
                        </div>
                        <div className="content">
                            <Link to={`/userprofile/${users.id}`} className="header">{users.userName}</Link>
                        </div>
                    </Link>
                </div> 
            )
        })
    }
    render() {
        
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" >
                    <h4>All Users</h4>
                        <div className="ui four column grid">
                            {this.renderList()}                                              
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapToSatate = (state) => {

    const users = Object.values(state.users)
    console.log(state.users)
    return { users: users };
}
export default connect(mapToSatate, { fetchUsers })(UsersList);