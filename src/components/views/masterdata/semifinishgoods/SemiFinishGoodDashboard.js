import React from 'react';
import { Link } from 'react-router-dom'
import SemiFInishGoodsList from "./SemiFinishGoodMaterialList";
class SemiFinishGoodDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>  
                        <Link to={"/settings"} className="ui button">Back</Link>           
                        <Link to={"/new-semi-finish-good"} className="ui blue button">New Semi Finish Good</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <SemiFInishGoodsList />
                </div>
            </div>
        )
    }
}
export default SemiFinishGoodDashboard;