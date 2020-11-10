import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchPurchaseOrders } from '../../../actions';


class SearchPurchaseOrderByDate extends React.Component {
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
    // onChange = (e) => {
    //     this.props.searchArticlesByDate(e.target.value)
    // }
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formValues) => {
        const startDate = formValues.startDate;
        const endDate = formValues.endDate;
        // this.props.searchReports(startDate, endDate)
        this.props.searchPurchaseOrders(formValues)
        console.log(formValues)
    }
    render() {
        return (
            <div className="search-bar">
                <form className="ui form mini" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="fields">
                        <div className="six field">
                            <Field name="startDate" component={this.renderInput} label="Start Date" placeholder="Start Date" type="date" />
                        </div>
                        <div className="six field">
                            <Field name="endDate" component={this.renderInput} label="End Date" placeholder="End Date" type="date" />
                        </div>
                    </div>
                    <button type="submit" className="ui primary mini button">Search</button>
                    <button onClick={this.onClick} className="ui red mini button">Clear</button>
                </form>
            </div>
        );
    }
}
const validate = (formValues) => {
    const errors = {}
    if (!formValues.startDate) {
        errors.startDate = 'Please enter start date';
    }
    if (!formValues.endDate) {
        errors.endDate = 'Please enter end date';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'sortReports',
    validate: validate
})(SearchPurchaseOrderByDate);
const mapToSatate = (state) => {
    console.log(state.reports.searchDates)
    return { searchDates: state.reports.searchDates };
}

export default connect(null, { searchPurchaseOrders})(formWrapped);
