import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSemiFinishGoods } from '../../../../actions';

class SemiFinishGoodMaterialList extends React.Component {
    componentDidMount() {
        this.props.fetchSemiFinishGoods()
    }

    renderList() {
        return this.props.material.map(material => {
            return (
                <tr key={material._id}>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                {material.materialCode}
                            </div>
                        </h4></td>
                    <td>
                        {material.materialName}
                    </td>
                    <td>
                        {material.materialGroup}
                    </td>
                    <td>
                        {material.baseUnitMeasure}
                    </td>
                    <td>
                        {material.division}
                    </td>
                    <td>
                        {material.materialState}
                    </td>
                    <td>
                        {material.materialDescription}
                    </td>
                    <td>
                        <Link to={`/single-semi-finish-good-material/${material._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>Semi Finish Goods</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Material Code</th>
                                <th>Material Name</th>
                                <th>Material Group</th>
                                <th>Base Unit</th>
                                <th>Division</th>
                                <th>Material Status</th>
                                <th>Material Description</th>
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
    const material = Object.values(state.semiFinishGoods)
    console.log(material)
    return { material: material };
}
export default connect(mapToSatate, { fetchSemiFinishGoods })(SemiFinishGoodMaterialList);