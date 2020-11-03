import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsMaster } from '../../../../actions';

class ProductsList extends React.Component {
    componentDidMount() {
        this.props.fetchProductsMaster()
    }

    renderList() {
        return this.props.products.map(product => {
            return (
                <tr key={product._id}>
                    <td>
                        <h4 className="ui image header">
                            <div className="content">
                                {product.productCode}
                            </div>
                        </h4></td>
                    <td>
                        {product.productName}
                    </td>
                    <td>
                        {product.productUom}
                    </td>
                    <td>
                        {product.sellingPrice}
                    </td>
                    <td>
                        {product.directCost}
                    </td>
                    <td>
                        {product.inDirectCost}
                    </td>
                    <td>
                        {product.profitMargin}
                    </td>
                    <td>
                        <Link to={`/single-product-master/${product._id}`} className="ui blue button">View</Link>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" id="basic-segment">
                    <h4>All Products</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr><th>Product Code</th>
                                <th>Product Name</th>
                                <th>UOM</th>
                                <th>Selling Price</th>
                                <th>Direct Cost</th>
                                <th>Indirect Cost</th>
                                <th>Profit Margin</th>
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
    const products = Object.values(state.productMaster)
    return { products: products };
}
export default connect(mapToSatate, { fetchProductsMaster })(ProductsList);