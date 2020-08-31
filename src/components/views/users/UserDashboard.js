import React from 'react';
import Image from "./elyse.png";
import './user.css';
import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>                    
                    <div className="column" >
                        <div className="ui link cards">
                            <Link to={"/employee"} className="card">
                                <div className="image">
                                    <img src={Image} alt={"dashbord images"}/>
                                </div>                                
                            </Link>
                            <Link to={"/customer"} className="card">
                                <div className="image">
                                    <img src={Image} alt={"dashbord images"}/>
                                </div>                                
                            </Link>
                            <Link to={"/supplier"} className="card">
                                <div className="image">
                                    <img src={Image} alt={"dashbord images"}/>
                                </div>                                
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserDashboard;