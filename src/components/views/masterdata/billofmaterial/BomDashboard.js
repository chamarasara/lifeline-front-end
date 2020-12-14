import React from 'react';
import { Link } from 'react-router-dom'
import BomList from './BomList';
class BomDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>   
                        <Link to={"/settings"} className="ui button">Back</Link>          
                        <Link to={"/new-bom"} className="ui blue button">New BOM</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <BomList />
                </div>
            </div>
        )
    }
}
export default BomDashboard;