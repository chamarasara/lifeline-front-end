import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchPurchaseOrders, searchPurchaseOrdersByText} from '../../../actions';

class SearchPurchaseOrder extends React.Component {
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formvalues) => {
        // const startDate = null;
        // const endDate = null;
        // const searchText = formvalues.searchText;
        console.log(formvalues)
        this.props.searchPurchaseOrders(formvalues)
        this.props.searchPurchaseOrdersByText(formvalues.searchText)
    }
 
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="Header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({ input, label, placeholder, type, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    render() {
        return (
            <div className="search-bar">
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="eight wide field">
                        <Field name="searchText" component={this.renderInput} label="Search" placeholder="Search by Customer or Product" type="text" />
                        <button type="submit" className="ui primary mini button">Search</button>
                        <button onClick={this.onClick} className="ui red mini button">Clear</button>
                    </div>
                   
                </form>
            </div>
        );
    };
};
const validate = (formvalues) => {
    const errors = {}
    if (!formvalues.searchText) {
        errors.searchText = 'Enter a Supplier Name or a Material Name';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'searchPurchaseOrder',
    validate: validate
})(SearchPurchaseOrder);
const mapToSatate = (state) => {
    //console.log(state.articles.searchText)
    return { searchText: state.purchaseOrders.searchText };
}

export default connect(mapToSatate, { searchPurchaseOrders, searchPurchaseOrdersByText})(formWrapped);


