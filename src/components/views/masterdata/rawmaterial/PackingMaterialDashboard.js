import React from 'react';
import { Link } from 'react-router-dom'
class PackingMaterialDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>             
                            <Link to={"/new-packing-material"} className="ui blue button">New Packing Material</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default PackingMaterialDashboard;