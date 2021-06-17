import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react'
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
    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }
    renderDispatchTable() {
      
        return(this.props.finishGood.issuedItems.map((data, index) => {
            console.log(data.Date)
            return (
                <tr key={index}>
                    <td>
                        {moment(data.Date).format('LLL')}
                    </td>
                    <td>
                        {data.invoiceNumber}
                    </td>
                    <td style={{ textAlign: "right" }}>
                        {data.quantity}
                    </td>
                </tr>
            )
        }))

    }
    renderReasonForDelay() {
        if (this.props.finishGood.reasonForDelay) {
            return(
                <p><strong>Reason for Delay:</strong><span> {this.props.finishGood.reasonForDelay}</span></p>
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
        const panes = [
            {
                menuItem: 'Batch Details', render: () =>
                    <Tab.Pane attached={false}>
                        <table className="ui celled small  structured table" style={{ marginTop: "20px" }}>
                            <thead className="full-width">
                                <tr>
                                    <th>Product Code</th>
                                    <th>Product Name</th>
                                    <th style={{ textAlign: "right" }}>Batch Number</th>
                                    <th style={{ textAlign: "right" }}>Selling Price</th>
                                    <th style={{ textAlign: "right" }}>Quantity</th>
                                    <th style={{ textAlign: "right" }}>Remaining Quantity</th>
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
                                    <td style={{ textAlign: "right" }}>
                                        {this.props.finishGood.batchNumber}<br />
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        {this.formatNumber(this.props.finishGood.sellingPrice.toFixed(2))}<br />
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        {this.props.finishGood.quantity}<br />
                                    </td>
                                    <td style={{ textAlign: "right" }}>
                                        {this.props.finishGood.remainingQuantity}<br />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Tab.Pane>
            },
            {
                menuItem: 'Dispatch Details', render: () =>
                    <Tab.Pane attached={false}>
                        <table className="ui celled small  structured table" style={{ marginTop: "20px" }}>
                            <thead className="full-width">
                                <tr>
                                    <th>Dispatched Date</th>
                                    <th>Invoice Number</th>
                                    <th style={{ textAlign: "right" }}>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDispatchTable()}
                            </tbody>
                        </table>
                    </Tab.Pane>
            }
        ]

        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <h3>Reference Number #{this.props.finishGood.refNumberFgInventory}</h3>
                    <p><strong>Record State:</strong><span style={{ color: "red" }}> {this.props.finishGood.finishGoodState}</span></p>
                    {this.reviseReason()}
                    <p><strong>Remarks:</strong><span> {this.props.finishGood.finishGoodDescription}</span></p>
                    <p><strong>Date:</strong><span> {moment(this.props.finishGood.createdAt).format('DD/MM/YYYY, h:mm: a')}</span></p>
                    <p><strong>Manufactured Date:</strong><span> {moment(this.props.finishGood.manufacturingDate).format('DD/MM/YYYY')}</span></p>
                    {this.renderReasonForDelay()}
                    <p><strong>Created by:</strong><span> {this.props.finishGood.userName}</span></p>                   
                    <Tab menu={{ pointing: true }} panes={panes} />
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