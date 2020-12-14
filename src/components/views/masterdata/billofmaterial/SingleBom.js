import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBom } from "../../../../actions";

class SingleBom extends React.Component {
    componentDidMount() {
        this.props.fetchBom(this.props.match.params.id)
    }
    render() {
        if (!this.props.bom) {
            return <div>BOM not selected. Please select a BOM from the list</div>
        }
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            <Link to={"/bom"} className="ui small button">
                                Back
                        </Link>
                            <Link to={`/delete-bom/${this.props.bom.id}`} className="ui small red button">
                                Delete
                        </Link>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="12" style={{ color: "red" }}><h4>BOM Details</h4></th>
                                    </tr>
                                    <tr>
                                        <th >Product Name</th>
                                        <th >Raw Materials</th>
                                        <th >Percentage %</th>
                                        <th >Packing Material</th>
                                        <th >Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >
                                            {
                                                this.props.bom.product.map(product => {
                                                    return (
                                                        <p key={product.id}>{product.productName}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td >
                                            {
                                                this.props.bom.rawMaterialList.map(material => {
                                                    return (
                                                        <p key={material.id}>{material.materialName}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td >
                                            {
                                                this.props.bom.rawMaterials.map(material => {
                                                    return (
                                                        <p key={material.id}>{material.percentage} %</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td >
                                            {
                                                this.props.bom.packingMaterialList.map(material => {
                                                    return (
                                                        <p key={material.id}>{material.materialName}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td >
                                            {
                                                this.props.bom.packingMaterials.map(material => {
                                                    return (
                                                        <p key={material.id}>{material.quantity}</p>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>
                                        <th colSpan="12">
                                            <Link to={`/edit-bom/${this.props.bom.id}`} className="ui small primary button">
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
    console.log(state.bom)
    return { bom: state.bom[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchBom })(SingleBom);
