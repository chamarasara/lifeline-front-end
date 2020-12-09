import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRawMaterial } from "../../../../actions";

class SingleRawMaterial extends React.Component {
    componentDidMount() {
        console.log(this.props.match.params.id)
        this.props.fetchRawMaterial(this.props.match.params.id)
    }
    renderMrpOne() {
        const mrpOne = this.props.material.mrpOne
        return (
            <div key={mrpOne._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="7" style={{ color: "red" }}><h4>MRP One</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="7" style={{ color: "blue" }}>General Data</th>
                        </tr>
                        <tr>
                            <th>ABC Indicator</th>
                            <th>Base Unit</th>
                            <th colSpan="2">MRP Group</th>
                            <th>Purchasing Group</th>
                            <th>Plant Material Status</th>
                            <th>Valid From</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{mrpOne.generalData.abcIndicator}</td>
                            <td>{mrpOne.generalData.baseUnit}</td>
                            <td colSpan="2">{mrpOne.generalData.mrpGroup}</td>
                            <td>{mrpOne.generalData.purchasingGroup}</td>
                            <td>{mrpOne.generalData.plantMaterialStatus}</td>
                            <td>{mrpOne.generalData.validFrom}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="7" style={{ color: "blue" }}>MRP Procedure</th>
                        </tr>
                        <tr>
                            <th colSpan="2">MRP Type</th>
                            <th colSpan="2">Re-order Point</th>
                            <th>Planning Time Fence</th>
                            <th>Planning Cycle</th>
                            <th>MRP Controller</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{mrpOne.mrpProcedure.mrpType}</td>
                            <td colSpan="2">{mrpOne.mrpProcedure.reOrderPoint}</td>
                            <td>{mrpOne.mrpProcedure.planningTimeFence}</td>
                            <td>{mrpOne.mrpProcedure.planningCycle}</td>
                            <td>{mrpOne.mrpProcedure.mrpController}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="18" style={{ color: "blue" }}>Lot Size Data</th>
                        </tr>
                        <tr>
                            <th>Lot Size</th>
                            <th>Minimum Lot Size</th>
                            <th>Maximum Lot Size</th>
                            <th>Talk Time</th>
                            <th>Rounding Profile</th>
                            <th>Rounding Value</th>
                            <th>Unit of Measure Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{mrpOne.lotSizeData.lotSize}</td>
                            <td>{mrpOne.lotSizeData.minimumLotSize}</td>
                            <td>{mrpOne.lotSizeData.maximumLotSize}</td>
                            <td>{mrpOne.lotSizeData.talkTime}</td>
                            <td>{mrpOne.lotSizeData.roundingProfile}</td>
                            <td>{mrpOne.lotSizeData.roundingValue}</td>
                            <td>{mrpOne.lotSizeData.unitOfMeasureGroup}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-mrp-one/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                    </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        )

    }
    renderMrpTwo() {
        const mrpTwo = this.props.material.mrpTwo
        return (
            <div key={mrpTwo._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "red" }}><h4>MRP Two</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="12" style={{ color: "blue" }}>Procurment</th>
                        </tr>
                        <tr>
                            <th>Procurement Type</th>
                            <th>Batch Entry</th>
                            <th colSpan="2">Product Store Location</th>
                            <th>Quota Usage</th>
                            <th>Supply Area</th>
                            <th>Back Flush</th>
                            <th>Storage Location</th>
                            <th>JIT Delivery</th>
                            <th>Stock Group</th>
                            <th>Co-product</th>
                            <th>Bulk Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{mrpTwo.procurement.procurementType}</td>
                            <td>{mrpTwo.procurement.batchEntry}</td>
                            <td colSpan="2">{mrpTwo.procurement.productStoreLocation}</td>
                            <td>{mrpTwo.procurement.quotaUsage}</td>
                            <td>{mrpTwo.procurement.supplyArea}</td>
                            <td>{mrpTwo.procurement.backFlush}</td>
                            <td>{mrpTwo.procurement.storageLocation}</td>
                            <td>{mrpTwo.procurement.jitDelivery}</td>
                            <td>{mrpTwo.procurement.stockgroup}</td>
                            <td>{mrpTwo.procurement.coProduct}</td>
                            <td>{mrpTwo.procurement.bulkMaterial}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "blue" }}>Scheduling</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Inhouse Production</th>
                            <th colSpan="2">Planned Delivery Time</th>
                            <th colSpan="2">GR Processing Time</th>
                            <th colSpan="3">Planning Calender</th>
                            <th colSpan="3">Scheduling Margin Key</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{mrpTwo.scheduling.inHouseProduction}</td>
                            <td colSpan="2">{mrpTwo.scheduling.plannedDeliveryTime}</td>
                            <td colSpan="2">{mrpTwo.scheduling.grProcessingTime}</td>
                            <td colSpan="3">{mrpTwo.scheduling.planningCalender}</td>
                            <td colSpan="3">{mrpTwo.scheduling.schedulingMarginKey}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="12" style={{ color: "blue" }}>Net Requirements </th>
                        </tr>
                        <tr>
                            <th colSpan="2">Lot Size</th>
                            <th colSpan="2">Minimum Lot Size</th>
                            <th colSpan="2">Maximum Lot Size</th>
                            <th colSpan="2">Rounding Profile</th>
                            <th colSpan="2">Rounding Value</th>
                            <th colSpan="2">Unit of Measure Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{mrpTwo.netRequirements.safetyStock}</td>
                            <td colSpan="2">{mrpTwo.netRequirements.minSafetyStock}</td>
                            <td colSpan="2">{mrpTwo.netRequirements.serviceLevel}</td>
                            <td colSpan="2">{mrpTwo.netRequirements.coverageProfile}</td>
                            <td colSpan="2">{mrpTwo.netRequirements.safetyTimeInd}</td>
                            <td colSpan="2">{mrpTwo.netRequirements.safetyTime}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-mrp-two/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                    </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
    renderMrpThree() {
        const mrpThree = this.props.material.mrpThree
        return (
            <div key={mrpThree._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="10" style={{ color: "red" }}><h4>MRP Three</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="10" style={{ color: "blue" }}>Forecast</th>
                        </tr>
                        <tr>
                            <th colSpan="3">Period Indicator</th>
                            <th colSpan="3">Fiscal Year Variant</th>
                            <th colSpan="4">Splitting Indicator</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3">{mrpThree.forecast.periodIndicator}</td>
                            <td colSpan="3">{mrpThree.forecast.fiscalYearVariant}</td>
                            <td colSpan="4">{mrpThree.forecast.splittingIndicator}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="10" style={{ color: "blue" }}>Planning</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Inhouse Production</th>
                            <th colSpan="2">Planned Delivery Time</th>
                            <th colSpan="2">GR Processing Time</th>
                            <th colSpan="2">Planning Calender</th>
                            <th colSpan="2">Scheduling Margin Key</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{mrpThree.planning.stratergyGroup}</td>
                            <td colSpan="2">{mrpThree.planning.consumptionMode}</td>
                            <td colSpan="2">{mrpThree.planning.fwdConsuptionPer}</td>
                            <td colSpan="3">{mrpThree.planning.planningMaterial}</td>
                            <td colSpan="3">{mrpThree.planning.planningConvFactor}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-mrp-three/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                    </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
    renderMrpFour() {
        const mrpFour = this.props.material.mrpFour
        return (
            <div key={mrpFour._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="5" style={{ color: "red" }}><h4>MRP Four</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="5" style={{ color: "blue" }}>BOM</th>
                        </tr>
                        <tr>
                            <th colSpan="1">Selection Method</th>
                            <th colSpan="1">Individual</th>
                            <th colSpan="1">Component Scrap</th>
                            <th colSpan="1">Requirements Group</th>
                            <th colSpan="1">Department Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="1">{mrpFour.bom.selectionMethod}</td>
                            <td colSpan="1">{mrpFour.bom.individual}</td>
                            <td colSpan="1">{mrpFour.bom.componentScrap}</td>
                            <td colSpan="1">{mrpFour.bom.requirementsGroup}</td>
                            <td colSpan="1">{mrpFour.bom.depRequirements}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="5" style={{ color: "blue" }}>Discontinued Parts</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Discontinued Ind</th>
                            <th colSpan="2">Eff-out</th>
                            <th colSpan="1">Follow up Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{mrpFour.discontinuedParts.discontinuedInd}</td>
                            <td colSpan="2">{mrpFour.discontinuedParts.effOut}</td>
                            <td colSpan="1">{mrpFour.discontinuedParts.followUpMaterial}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-mrp-four/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                    </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
    renderPlantDataOne() {
        const plantDataOne = this.props.material.plantDataOne;
        console.log(plantDataOne)
        return (
            <div key={plantDataOne._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="10" style={{ color: "red" }}><h4>Plant Data One</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="10" style={{ color: "blue" }}>General Data</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Unit of Issue</th>
                            <th colSpan="2">Temp Conditions</th>
                            <th colSpan="2">Storage Conditions</th>
                            <th colSpan="2">Container Requirements</th>
                            <th colSpan="2">Haz Material Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{plantDataOne.generalData.unitOfIssue}</td>
                            <td colSpan="2">{plantDataOne.generalData.tempConditions}</td>
                            <td colSpan="2">{plantDataOne.generalData.storageConditions}</td>
                            <td colSpan="2">{plantDataOne.generalData.containerRequirements}</td>
                            <td colSpan="2">{plantDataOne.generalData.hazMaterialNumber}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="10" style={{ color: "blue" }}>Shelf Life Data</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Max Storage Period</th>
                            <th colSpan="2">Time Unit</th>
                            <th colSpan="1">Min Remaining Shelf Life</th>
                            <th colSpan="1">Total Shelf Life</th>
                            <th colSpan="2">Period for Sled</th>
                            <th colSpan="2">Storage Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{plantDataOne.shelfLifeData.maxStoragePeriod}</td>
                            <td colSpan="2">{plantDataOne.shelfLifeData.timeUnit}</td>
                            <td colSpan="1">{plantDataOne.shelfLifeData.minRemainigShelfLife}</td>
                            <td colSpan="1">{plantDataOne.shelfLifeData.totalShelfLife}</td>
                            <td colSpan="2">{plantDataOne.shelfLifeData.periodForSled}</td>
                            <td colSpan="2">{plantDataOne.shelfLifeData.storagePercentage}</td>
                        </tr>
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-plant-one/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        )
    }
    renderPlantDataTwo() {
        const plantDataTwo = this.props.material.plantDataTwo;
        return (
            <div key={plantDataTwo._id}>
                <table className="ui celled small padded compact structured table">
                    <thead className="full-width">
                        <tr>
                            <th colSpan="8" style={{ color: "red" }}><h4>Plant Data Two</h4></th>
                        </tr>
                        <tr>
                            <th colSpan="8" style={{ color: "blue" }}>Weight</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Container Type</th>
                            <th colSpan="1">Units Per Pallet</th>
                            <th colSpan="1">Gross Weight Per Unit</th>
                            <th colSpan="1">Weight Unit</th>
                            <th colSpan="1">Net Weight</th>
                            <th colSpan="1">Volume</th>
                            <th colSpan="1">Volume Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{plantDataTwo.weight.containerType}</td>
                            <td colSpan="1">{plantDataTwo.weight.unitsPerPallet}</td>
                            <td colSpan="1">{plantDataTwo.weight.grossWeightPerUnit}</td>
                            <td colSpan="1">{plantDataTwo.weight.weightUnit}</td>
                            <td colSpan="1">{plantDataTwo.weight.netWeight}</td>
                            <td colSpan="1">{plantDataTwo.weight.volume}</td>
                            <td colSpan="1">{plantDataTwo.weight.volumeUnit}</td>
                        </tr>
                    </tbody>
                    <thead className="full-width">
                        <tr>
                            <th colSpan="8" style={{ color: "blue" }}>Dimensions</th>
                        </tr>
                        <tr>
                            <th colSpan="2">Dimensions Unit</th>
                            <th colSpan="2">Length</th>
                            <th colSpan="2">Width</th>
                            <th colSpan="2">Height</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2">{plantDataTwo.weight.dimensionsUnit}</td>
                            <td colSpan="2">{plantDataTwo.weight.dimensionsL}</td>
                            <td colSpan="2">{plantDataTwo.weight.dimensionsW}</td>
                            <td colSpan="2">{plantDataTwo.weight.dimensionsH}</td>
                        </tr>
                    </tbody>

                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="25">
                                <Link to={`/edit-raw-material-plant-two/${this.props.material.id}`} className="ui small primary button">
                                    Edit
                                    </Link>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
    renderSupplierList() {

        return (
            <tr>
                <td colSpan="3">{this.props.material.suppliersList.map(supplier => {
                    return (
                        <p key={supplier.id}>{supplier.companyName}</p>
                    )
                })
                }</td>
                <td colSpan="3">{this.props.material.suppliersList.map(supplier => {
                    return (
                        <p key={supplier.id}>{supplier.mobileNo1}, {supplier.mobileNo2}</p>
                    )
                })
                }</td>
                <td colSpan="3">{this.props.material.suppliersList.map(supplier => {
                    return (
                        <p key={supplier.id}>{supplier.fax}</p>
                    )
                })
                }</td>
                <td colSpan="3">{this.props.material.suppliersList.map(supplier => {
                    return (
                        <p key={supplier.id}>{supplier.email}</p>
                    )
                })
                }</td>
            </tr>
        )
    }

    render() {
        if (!this.props.material) {
            return <div>Raw Material not selected. Please select a Raw Material from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            <Link to={"/raw-material"} className="ui small button">
                                Back
                        </Link>
                            <Link to={`/delete-raw-material/${this.props.material.id}`} className="ui small red button">
                                Delete
                        </Link>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>Basic Details</h4></th>
                                    </tr>
                                    <tr>
                                        <th colSpan="2">Material Code</th>
                                        <th colSpan="3">Material Name</th>
                                        <th colSpan="3">Material Group</th>
                                        <th colSpan="2">Base Unit</th>
                                        <th colSpan="2">Material State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="2">RM{this.props.material.materialCodeRm}</td>
                                        <td colSpan="3">{this.props.material.materialName}</td>
                                        <td colSpan="3">{this.props.material.materialGroup}</td>
                                        <td colSpan="2">{this.props.material.baseUnitMeasure}</td>
                                        <td colSpan="2">{this.props.material.materialState}</td>
                                    </tr>
                                </tbody>
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}>Suppliers</th>
                                    </tr>
                                    <tr>
                                        <th colSpan="3">Company Name</th>
                                        <th colSpan="3">Contact Number</th>
                                        <th colSpan="3">Fax</th>
                                        <th colSpan="3">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderSupplierList()}
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/raw-material-edit-details/${this.props.material.id}`} className="ui small primary button">
                                                Edit
                                            </Link>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                    </div>

                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            {this.renderPlantDataOne()}
                        </div>
                    </div>
                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            {this.renderPlantDataTwo()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapToSatate = (state, ownPorps) => {
    console.log(state.rawMaterials[ownPorps.match.params.id])
    console.log(state)
    return { material: state.rawMaterials[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchRawMaterial })(SingleRawMaterial);
