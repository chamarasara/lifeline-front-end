import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchQuotations, fetchCustomer } from "../../../../actions"
class QuotationSearchResults extends React.Component {
    componentDidMount() {
        //this.props.fetchQuotations()
    }

    getProductSellingPrice() {
        const productsArray = this.props.quotations.map(price => {
            console.log(price)
            return price.products
        })
        const productsListArray = this.props.quotations.map(price => {
            return price.productsList
        })
        const sellingPriceProductsArray = productsArray.map(price => {
            //console.log(price)
            return price.map(sellingPrice => {
                console.log(sellingPrice.sellingPrice)
                return sellingPrice.sellingPrice
            })
        })
        const sellingPriceProductsListArray = productsListArray.map(price => {
            //console.log(price)
            return price.map(sellingPrice => {
                console.log(sellingPrice.sellingPrice)
                return sellingPrice.sellingPrice
            })
        })
        const price = sellingPriceProductsArray.map(price => {
            console.log(price[0])
            return price
        })
        const price2 = sellingPriceProductsListArray.map(price => {
            console.log(price[0])
            return price
        })
        
        console.log(price)
        console.log(price2)
        if (!price[0]===undefined) {
            return price.map(price=>{
                return(
                    <p key={Math.random()}>{price.sellingPrice}</p>
                )
            })
        }else{
            return price2.map(price => {
                return (
                    <p key={Math.random()}>{price.sellingPrice}</p>
                )
            })
        }
        //console.log(sellingPriceArray[1])
        // const productsArrayPrice = this.props.quotations.products.map(price => {
        //     //console.log(price.sellingPrice)
        //     return price.sellingPrice
        // })
        // const productsDetailsArrayPrice = this.props.quotations.productsList.map(price => {
        //     return price.sellingPrice
        // })

        // if (!productsArrayPrice[0] === undefined) {
        //     return productsArrayPrice.map(sellingPrice => {
        //         return (
        //             <p key={Math.random()}>{sellingPrice.sellingPrice}</p>
        //         )
        //     })
        // } else {
        //     return productsDetailsArrayPrice.map(sellingPrice => {
        //         return (
        //             <p key={Math.random()}>{sellingPrice}</p>
        //         )
        //     })

        // }
    }
    renderList() {
        if (!this.props.quotations) {
            return (
                <div>
                    <div className="ui active centered inline loader"></div>
                </div>
            )
        }
        return this.props.quotations.map(quotation => {
            console.log(quotation)
            const date = quotation.date;
            const date2 = moment(date).format('DD/MM/YYYY, h:mm: a')
            if (quotation.quotation_state === "Pending" || quotation.quotation_state === "Approved") {
                return (
                    <tr key={quotation.id}>
                        <td>
                            {quotation.quotationNumber}<br />
                            <span style={{ color: "red" }}>{quotation.quotation_state}</span>
                        </td>
                        <td>
                            {
                                quotation.customerDetails.map(customer1 => {
                                    return (
                                        <span key={customer1.id}>{customer1.companyName}</span>
                                    )
                                })
                            }
                        </td>
                        <td>
                            {
                                quotation.productsList.map(product => {
                                    return (
                                        <p key={product.id}>{product.productName}</p>
                                    )
                                })
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                quotation.products.map(quantity => {
                                    return (
                                        <p key={Math.random()}>{quantity.quantity}</p>
                                    )
                                }
                                )
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            
                            {
                                quotation.products.map(sellingPrice => {
                                    return (
                                        <p key={Math.random()}>{sellingPrice.sellingPrice}</p>
                                    )
                                }
                                )
                            }
                        </td>
                        <td style={{ "textAlign": "right" }}>
                            {
                                quotation.products.map(product => {
                                    return (
                                        <p key={product.id}>{product.discount}%</p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            <Link to={`/view-quotation/${quotation.id}`} className="ui blue button">View</Link>
                        </td>
                    </tr>
                )
            }

        })
    }
    render() {
        if (this.props.quotations.length <= 0) {
            return (
                <div>
                    <p>No quotations found!</p>
                </div>
            )
        }
        return (
            <div >
                <div >
                    <h4>All quotations</h4>
                    <table className="ui very basic collapsing celled table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Company Name</th>
                                <th>Products</th>
                                <th>Quantities</th>
                                <th>Rate</th>
                                <th>Discount</th>
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
    const quotations = Object.values(state.searchQuotations)
    console.log(state)
    return { quotations: quotations.reverse() };
}
export default connect(mapToSatate, { fetchQuotations, fetchCustomer })(QuotationSearchResults);