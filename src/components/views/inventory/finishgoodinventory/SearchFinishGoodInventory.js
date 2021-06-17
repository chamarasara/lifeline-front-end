import React from 'react';
import { Field, formValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { searchFinishGoodsInventory, fetchFinishGoods } from '../../../../actions';

class SearchFinishGoodInventory extends React.Component {
    componentDidMount() {
        this.props.fetchFinishGoods()
    }
    onClick = () => {
        window.location.reload()
    }
    onSubmit = (formValues) => {
        console.log(formValues)
        this.props.searchFinishGoodsInventory(formValues)
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
    renderSelectField = ({ input, label, type, meta, children }) => (
        <div>
            <label>{label}</label>
            <div>
                <select {...input}>
                    {children}
                </select>
                {this.renderError(meta)}
            </div>
        </div>
    )
    renderProducts() {
        return this.props.products.map(product => {
            return (
                <option key={product._id} value={product.productName}>{product.productName}</option>
            )
        })
    }
    render() {
        return (
            <div className="search-bar">
                <form className="ui mini form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="eight wide field">
                         Search by Product <span style={{ color: "red", fontSize: "18px" }}>*</span>
                        <Field name="searchText" type="text" required component={this.renderSelectField} >
                            <option>-Select Product-</option>
                            {this.renderProducts()}
                        </Field>
                        <div style={{ paddingBottom: "15px" }}></div>
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
        errors.searchText = 'Select a Product Name';
    }
    return errors;
}
const formWrapped = reduxForm({
    form: 'searchInvoice',
    validate: validate
})(SearchFinishGoodInventory);

const mapStateToProps = (state) => {
    const products = Object.values(state.finishGoods)
    return { products: products };
}
export default connect(mapStateToProps, { searchFinishGoodsInventory, fetchFinishGoods })(formWrapped);


