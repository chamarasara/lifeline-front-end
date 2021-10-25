import React from 'react';
import { Link } from "react-router-dom";

class Settings extends React.Component {
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "90px" }}>
                    <div className="ui four column grid">
                        <div className="column">
                            <Link to={"/raw-material"} className="massive ui blue button">
                                Raw Material
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/packing-material"} className="massive ui blue button">
                                Packing Material
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/semi-finish-goods"} className="massive ui blue button">
                                Semi Finish Goods
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/finish-goods"} className="massive ui blue button">
                                Finish Goods
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/bom"} className="massive ui blue button">
                                Bill of Material
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/customer"} className="massive ui blue button">
                                Customer Master
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/supplier"} className="massive ui blue button">
                                Supplier Master
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/distributor-dashboard"} className="massive ui blue button">
                                Distributor Master
                            </Link>
                        </div>
                        <div className="column">
                            <Link to={"/employee-master-dashboard"} className="massive ui blue button">
                                Employee Master
                            </Link>
                        </div>
                        <div className="column">
                            <button className="massive ui blue button">
                                Quality Master
                            </button>
                        </div>
                        <div className="column">
                            <button className="massive ui blue button">
                                Consumable Master
                            </button>
                        </div>
                        <div className="column">
                            <Link to={"/bank-accounts-dashboard"} className="massive ui blue button">
                                Bank Accounts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Settings;