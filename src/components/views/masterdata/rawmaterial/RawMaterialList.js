import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchRawMaterials} from '../../../../actions';

class RawMaterialList extends React.Component {
    componentDidMount() {
        this.props.fetchRawMaterials()
    }

    renderList() {   
        return this.props.material.map(material => {
            console.log(material._id)
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
                    <td>{material.materialState}
                    </td>
                    <td>
                        <Link to={`/single-raw-material/${material._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>Raw Materials</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Material Code</th>
                                <th>Material Name</th>
                                <th>Material Group</th>
                                <th>Base Unit</th>
                                <th>Division</th>
                                <th>Material Status</th>
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
    const material = Object.values(state.rawMaterials)
    console.log(material)
    return { material: material };
}
export default connect(mapToSatate, { fetchRawMaterials })(RawMaterialList);