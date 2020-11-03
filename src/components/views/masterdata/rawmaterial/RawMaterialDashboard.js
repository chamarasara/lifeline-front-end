import React from 'react';
import { Link } from 'react-router-dom'
import RawMaterialList from './RawMaterialList';
class RawMaterialDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/new-raw-material"} className="ui blue button">New Raw Material</Link>
                    </div>                    
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <RawMaterialList />
                </div>
            </div>
        )
    }
}
export default RawMaterialDashboard;