import React from 'react';
import { Link } from 'react-router-dom';
import ProductsMasterList from './ProductsList';
class ProductDashboard extends React.Component {

    render() {
        return (
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                    <div className="column" style={{ paddingTop: "30px" }}>
                        <Link to={"/settings"} className="ui button">Back</Link>
                        <Link to={"/new-product"} className="ui blue button">New Product</Link>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="sixteen wide column"></div>
                    <ProductsMasterList/>
                </div>
            </div>
        )
    }
}
export default ProductDashboard;