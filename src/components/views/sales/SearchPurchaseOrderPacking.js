import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchPurchaseOrdersPacking} from '../../../actions';

class SearchPurchaseOrderPacking extends React.Component {
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formvalues) => {
        console.log(formvalues)
        this.props.searchPurchaseOrdersPacking(formvalues)
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
                        <Field name="searchText" component={this.renderInput} label="Search" placeholder="Enter Supplier Name/Material Name" type="text" />
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
    form: 'searchPurchaseOrderPacking',
    validate: validate
})(SearchPurchaseOrderPacking);


export default connect(null, { searchPurchaseOrdersPacking})(formWrapped);


