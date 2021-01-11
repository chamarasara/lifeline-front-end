import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchQuotations, fetchCustomer } from "../../../../actions"
class QuotationSearchResults extends React.Component {
    componentDidMount() {
        //this.props.fetchQuotations()
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
            if (quotation.quotation_state === "Pending" || quotation.quotation_state==="Approved" ) {
                return (
                    <tr key={quotation.id}>
                        <td>
                            {quotation.quotationNumber}<br/>
                            <span style={{color:"red"}}>{quotation.quotation_state}</span>
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
                                quotation.productsList.map(product => {
                                    return (
                                        <p key={product.id}>{product.sellingPrice}</p>
                                    )
                                })
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