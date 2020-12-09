import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFinishGoods} from '../../../../actions';

class FinishGoodMaterialList extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGoods()
    }

    renderList() {   
        return this.props.material.map(material => {
            console.log(material._id)
            return (
                <tr key={material._id}>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                FG{material.productCode}                                
                            </div>
                        </h4></td>
                    <td>
                        {material.productName}
                    </td>
                        <td>
                        {material.productCategory}
                    </td>
                    <td>
                        {material.baseUnitMeasure}
                    </td>
                    <td>
                        {material.division}
                    </td>
                    <td>{material.productState}
                    </td>
                    <td>
                        <Link to={`/single-finish-good-material/${material._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>Finish Goods</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Product Code</th>
                                <th>Product Name</th>
                                <th>Product Group</th>
                                <th>Base Unit</th>
                                <th>Division</th>
                                <th>Product Status</th>
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
    const material = Object.values(state.finishGoods)
    console.log(material)
    return { material: material };
}
export default connect(mapToSatate, { fetchFinishGoods })(FinishGoodMaterialList);