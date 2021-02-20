import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFinishGood } from "../../../../actions";

class FinishGoodMaterial extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGood(this.props.match.params.id)
    }
    render() {
        if (!this.props.material) {
            return <div>Finish Good not selected. Please select a Finish Good from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            <Link to={"/finish-goods"} className="ui small button">
                                Back
                        </Link>
                            <Link to={`/delete-finish-good-material/${this.props.material.id}`} className="ui small red button">
                                Delete
                        </Link>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>Basic Details</h4></th>
                                    </tr>
                                    <tr>
                                        <th >Product Code</th>
                                        <th >Product Name</th>
                                        <th >Product Group</th>
                                        <th >Base Unit</th>
                                        <th >Division</th>
                                        <th >Material State</th>
                                        <th >Units in a Pack</th>
                                        <th >Minimum Selling Units</th>
                                        <th >Product Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >FG{this.props.material.productCode}</td>
                                        <td >{this.props.material.productName}</td>
                                        <td >{this.props.material.productCategory}</td>
                                        <td >{this.props.material.baseUnitMeasure}</td>
                                        <td >{this.props.material.division}</td>
                                        <td >{this.props.material.productState}</td>
                                        <td >{this.props.material.unitsInPack}</td>
                                        <td >{this.props.material.minimumSellingUnits}</td>
                                        <td >{this.props.material.productDescription}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/finish-good-edit-details/${this.props.material.id}`} className="ui small primary button">
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>Management Data</h4></th>
                                    </tr>
                                    <tr>
                                        <th >Profit Center</th>
                                        <th >Bar Code</th>
                                        <th >Art Work Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >{this.props.material.profitCenter}</td>
                                        <td >{this.props.material.barCode}</td>
                                        <td >{this.props.material.artWorkNumber}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/finish-good-edit-management-details/${this.props.material.id}`} className="ui small primary button">
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>Financial Data</h4></th>
                                    </tr>
                                    <tr style={{ textAlign: "right" }}>
                                        <th >Selling Price</th>
                                        <th >Factory Price</th>
                                        <th >Distributor Margin %</th>
                                        <th >Retailer Margin %</th>                                    
                                        <th >Maximum Discount %</th>
                                        <th >Free Issues </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ textAlign: "right" }}>
                                        <td >{this.props.material.sellingPrice}</td>
                                        <td >
                                            {this.props.material.factoryPrice}<br/>
                                        </td>
                                        <td >{this.props.material.distributorMargin} %</td>
                                        <td >{this.props.material.retailerMargin} %</td>                                        
                                        <td >{this.props.material.maximumDiscount} %</td>
                                        <td >{this.props.material.freeIssues}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/finish-good-edit-financial-details/${this.props.material.id}`} className="ui small primary button">
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>                            
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>Quality Data</h4></th>
                                    </tr>
                                    <tr>
                                        <th >Shelf Life</th>
                                        <th >Perfume Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >{this.props.material.shelfLife}</td>
                                        <td >{this.props.material.perfumeCode}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/finish-good-edit-quality-details/${this.props.material.id}`} className="ui small primary button">
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
const mapToSatate = (state, ownPorps) => {
    return { material: state.finishGoods[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchFinishGood })(FinishGoodMaterial);
