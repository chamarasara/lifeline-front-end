import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBoms } from '../../../../actions';

class BomList extends React.Component {
    componentDidMount() {
        this.props.fetchBoms()
    }

    renderList() {
        return this.props.bom.map(bom1 => {
            console.log(bom1._id)
            return (
                <tr key={bom1._id}>
                    <td>
                        {
                            bom1.product.map(product => {
                                return (
                                    <p key={product.id}>{product.productName}</p>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            bom1.rawMaterialList.map(material => {
                                return (
                                    <p key={material.id}>{material.materialName}</p>
                                )
                            })
                        }
                    </td>
                    <td>
                        {
                            bom1.packingMaterialList.map(material => {
                                return (
                                    <p key={material.id}>{material.materialName}</p>
                                )
                            })
                        }
                    </td>
                    <td>
                        <Link to={`/single-bom/${bom1.id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>Bill of Materials</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Raw Materials</th>
                                <th>Packing Materials</th>
                            </tr></thead>
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
    console.log(state)
    const bom = Object.values(state.bom)
    console.log(bom)
    return { bom: bom };
}
export default connect(mapToSatate, { fetchBoms })(BomList);