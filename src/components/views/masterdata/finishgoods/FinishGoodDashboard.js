import React from 'react';
import { Link } from 'react-router-dom'
import FinishGoodsList from './FinishGoodMaterialList';
class FinishGoodDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>   
                        <Link to={"/settings"} className="ui button">Back</Link>          
                        <Link to={"/new-finish-good"} className="ui blue button">New Finish Good</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <FinishGoodsList />
                </div>
            </div>
        )
    }
}
export default FinishGoodDashboard;