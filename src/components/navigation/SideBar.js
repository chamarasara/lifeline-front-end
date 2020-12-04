import React from 'react';
import { Link } from "react-router-dom";
import ProfilePic from "../views/users/kapila.jpeg";
import { connect } from 'react-redux';
import {signOutAction} from '../../actions';


class SideBar extends React.Component {
    submit = (values) => {
        this.props.signOutAction();
    }
    navibarLinks() {
        return [
            <div key={Math.random()} id="sidebar">
                <div className="ui sidebar visible thin inverted vertical menu">
                    <Link to={"/"} className="item">
                        <i className="home icon"></i>
                        Dashboard
                    </Link>
                    <Link to={"/employee"} className="item">
                        <i className="user circle icon"></i>
                        Users
                    </Link>
                    <Link to={"/sales-dashboard"} className="item">
                        <i className="bullhorn icon"></i>
                        Sales
                    </Link>
                    <Link to={"/approvals-dashboard"} className="item">
                        <i className="list icon"></i>
                        Approvals
                    </Link>
                    <Link to={"/settings"} className="item">
                        <i className="cogs icon"></i>
                        Settings
                    </Link>
                </div>
                <div className="ui top fixed menu">
                    <div className="right menu">
                        <Link to="/userprofile"className="ui label">
                            <img className="ui right spaced avatar image" src={ProfilePic} alt={"user profile"}/>
                                Kapila
                        </Link>
                        <div className="item">
                            <button onClick={this.submit} className="ui primary button">Logout</button>
                        </div>
                    </div>
                </div>

            </div>
        ]
    }
    render() {
        return (
            <div className="">
                {this.navibarLinks()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error };
}
export default connect(mapStateToProps, { signOutAction })(SideBar);