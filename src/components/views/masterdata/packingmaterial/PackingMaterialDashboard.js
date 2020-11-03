import React from 'react';
import { Link } from 'react-router-dom';
import PackingMaterialList from './PackingMaterialList';
class PackingMaterialDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/new-packing-material"} className="ui blue button">New Packing Material</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <PackingMaterialList />
                </div>
            </div>
        )
    }
}
export default PackingMaterialDashboard;