import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { searchFinishGoodsInventory } from "../../../../actions"

class FinishGoodInventorySearchResults extends React.Component {
    componentDidMount() {
        // this.props.searchFinishGoodsInventory()
    }


    renderList() {
        if (!this.props.finishGoods || this.props.finishGoods.length <= 0) {
            return (
                <div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }
        return this.props.finishGoods.map(finishGood => {
            const date = finishGood.createdAt;
            const date2 = moment(date).format('DD/MM/YYYY, h:mm: a')          
            if (finishGood.productDetails) {
                if (finishGood.finishGoodState==="Revised") {
                    return (
                        <tr className="negative" key={finishGood.id}>
                            <td>
                                {finishGood.refNumberFgInventory}<br />
                                <span style={{ color: "red" }}>{finishGood.finishGoodState}</span>
                            </td>
                            <td>
                                <span >{date2}</span>
                            </td>
                            <td>
                                {
                                    finishGood.productDetails.map(product => {
                                        return (
                                            <span key={product.id}>{product.productName}</span>
                                        )
                                    })
                                }
                            </td>
                            <td>
                                <span >{finishGood.batchNumber}</span>
                            </td>
                            <td>
                                <span >({finishGood.quantity})</span>
                            </td>
                            <td>
                                <span >({finishGood.remainingQuantity})</span>
                            </td>
                            <td>
                                <Link to={`/single-finish-good-inventory/${finishGood.id}`} className="mini ui blue button">View</Link>
                            </td>
                        </tr>
                    )
                }else{
                    return (
                        <tr key={finishGood.id}>
                            <td>
                                {finishGood.refNumberFgInventory}<br />
                                <span style={{ color: "red" }}>{finishGood.finishGoodState}</span>
                            </td>
                            <td>
                                <span >{date2}</span>
                            </td>
                            <td>
                                {
                                    finishGood.productDetails.map(product => {
                                        return (
                                            <span key={product.id}>{product.productName}</span>
                                        )
                                    })
                                }
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <span >{finishGood.batchNumber}</span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <span >{finishGood.quantity}</span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                                <span >{finishGood.remainingQuantity}</span>
                            </td>
                            <td>
                                <Link to={`/single-finish-good-inventory/${finishGood.id}`} className="mini ui blue button">View</Link>
                            </td>
                        </tr>
                    )
                }                
            }            
        })
    }
    render() {
        if (this.props.finishGoods.length <= 0) {
            return (
                <div>
                    <p>No finish goods found!</p>
                </div>
            )
        }
        return (
            <div >
                <div >
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Reference Number</th>
                                <th>Date</th>
                                <th>Product Name</th>
                                <th>Batch Number</th>
                                <th>Quantity</th>
                                <th>Remaining Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state) => {
    const finishGoods = Object.values(state.finishGoodInventory)
    return { finishGoods: finishGoods.reverse() };
}
export default connect(mapToSatate, { searchFinishGoodsInventory })(FinishGoodInventorySearchResults);