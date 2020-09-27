import React from 'react';
import { Link } from 'react-router-dom'
class FinishGoodsDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>             
                            <Link to={"/new-finish-good"} className="ui blue button">New Finish Good</Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default FinishGoodsDashboard;