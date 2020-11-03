import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductMaster } from "../../../../actions";

class SingleProductMaster extends React.Component {
    componentDidMount() {
        this.props.fetchProductMaster(this.props.match.params.id)
    }
        
    render() {
        if (!this.props.product) {
            return <div>Please select a Product</div>
        }
        console.log(this.props.product)
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "80px" }}>
                    <div className="ui grid">
                        <div className="sixteen wide column" style={{ marginTop: "0px" }}>
                            <Link to={"/products-dashboard"} className="ui small button">
                                Back
                        </Link>
                            <Link to={`/delete-product-master/${this.props.product._id}`} className="ui small red button">
                                Delete
                        </Link>
                            <table className="ui celled structured table">
                                <thead className="full-width">
                                    <tr>
                                        <th colSpan="7" style={{ color: "red" }}><h4>Basic Details</h4></th>
                                    </tr>
                                    <tr>
                                        <th>Product Code</th>
                                        <th>Product Name</th>
                                        <th>UOM</th>
                                        <th>Selling Price</th>
                                        <th>Direct Cost</th>
                                        <th>Indirect Cost</th>
                                        <th>Profit Margin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.props.product.productCode}</td>
                                        <td>{this.props.product.productName}</td>
                                        <td>{this.props.product.productUom}</td>
                                        <td>{this.props.product.sellingPrice}</td>
                                        <td>{this.props.product.directCost}</td>
                                        <td>{this.props.product.inDirectCost}</td>
                                        <td>{this.props.product.profitMargin}</td>
                                    </tr>
                                </tbody>
                                <tfoot className="full-width">
                                    <tr>

                                        <th colSpan="7">
                                            <Link to={`/product-master-edit-details/${this.props.product._id}`} className="ui small primary button">
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
    console.log(state.productMaster[ownPorps.match.params.id])
    return { product: state.productMaster[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { fetchProductMaster })(SingleProductMaster);
