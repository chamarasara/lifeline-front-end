import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { fetchFinishGoodInventory } from '../../../../actions';

class SingleFinishGood extends React.Component {

    componentDidMount() {
        this.props.fetchFinishGoodInventory(this.props.match.params.id)
        console.log(this.props.match.params.id)
    }
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    reviseReason() {
        if (this.props.finishGood.reviseReason) {
            return (
                <p><strong>Reason for revise:</strong><span style={{ color: "red" }}> {this.props.finishGood.reviseReason}</span></p>
            )
        }
    }
    renderButtons() {
        if (this.props.finishGood.finishGoodState === "Active") {
            return (
                <div>
                    <Link to={"/finish-good-inventory-dashboard"} type="button" className="ui button">Back</Link>
                    <Link to={`/revise-finish-good-inventory/${this.props.match.params.id}`} type="button" className="ui red button">Disable</Link>
                </div>
            )
        } else if (this.props.finishGood.finishGoodState === "Revised") {
            return (
                <div>
                    <Link to={"/finish-good-inventory-dashboard"} type="button" className="ui button">Back</Link>
                </div>
            )
        }
    }
    render() {
        if (!this.props.finishGood) {
            console.log(this.props.finishGood)
            return (
                <div className="pusher">
                    <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}></div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <h3>Reference Number #{this.props.finishGood.refNumberFgInventory}</h3>
                    <p><strong>Record State:</strong><span style={{ color: "red" }}> {this.props.finishGood.finishGoodState}</span></p>
                    {this.reviseReason()}                    
                    <p><strong>Remarks:</strong><span> {this.props.finishGood.finishGoodDescription}</span></p>
                    <p><strong>Date:</strong><span> {moment(this.props.finishGood.createdAt).format('DD/MM/YYYY, h:mm: a')}</span></p>
                    <p><strong>Created by:</strong><span> {this.props.finishGood.userName}</span></p>
                    <table className="ui celled small  structured table" style={{ marginTop: "20px" }}>
                        <thead className="full-width">
                            <tr>
                                <th colSpan="12" style={{ color: "red" }}><h4>Details</h4></th>
                            </tr>
                            <tr>
                                <th>Product Code</th>
                                <th>Product Name</th>
                                <th>Batch Number</th>
                                <th style={{ textAlign: "right" }}>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={Math.random()}>
                                <td>
                                    {this.props.finishGood.productDetails.map(product => {
                                        return (
                                            <span key={Math.random()}>FG{product.productCode}</span>
                                        )
                                    })}
                                </td>
                                <td>
                                    {this.props.finishGood.productDetails.map(product => {
                                        return (
                                            <span key={Math.random()}>{product.productName}</span>
                                        )
                                    })}
                                </td>
                                <td>
                                    {this.props.finishGood.batchNumber}<br />
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    {this.props.finishGood.quantity}<br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        {this.renderButtons()}
                    </div>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const finishGood = state.finishGoodInventory[ownProps.match.params.id]
    return { errorMessage: state, finishGood: finishGood };
}

export default connect(mapStateToProps, { fetchFinishGoodInventory })(SingleFinishGood);