import React from 'react'
import { Link } from 'react-router-dom';
import SupplierList from './SupplierList';
class Supplier extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <div className="column" style={{ paddingTop: "70px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/new-supplier"} className="ui blue button">New Suplier</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <SupplierList />
                </div>                
            </div>
        )
    }
}
export default Supplier;