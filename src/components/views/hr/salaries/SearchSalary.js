import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchSalaries} from '../../../../actions';

class SearchSalary extends React.Component {
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.searchSalaries(formValues)
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
                        <Field name="searchText" component={this.renderInput} label="Search" placeholder="Employee Name/Number or Ref Number" type="text" />
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
        errors.searchText = 'Please Search by Employee Name/Number or Ref Number';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'searchInvoice',
    validate: validate
})(SearchSalary);


export default connect(null, { searchSalaries})(formWrapped);


