import React from "react";
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createUserRole } from '../../../actions';

class NewUserRole extends React.Component{
    
    permissions = {
        inventory: false,
        sales: false,
        production: false,
        quality: false,
        costing: false,
        accounting: false,
        hr : false,
        admin: false
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
    errorMessage() {
        if (this.props.errorMessage) {
            console.log(this.props)
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
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
    submit = (values) => {
        this.props.createUserRole(values)
        console.log(values)
    }
    render(){
        return(
            <div className="pusher">
                <div className="ui basic segment" style={{ paddingLeft: "150px", paddingTop: "60px" }}>
                <h5>Create User Role</h5>
                    <div className="column">
                        <form onSubmit={this.props.handleSubmit(this.submit)} className="ui mini form">
                            <div className="fields">
                                <div className="six wide field">
                                    <Field name="userTypeCode"
                                        component="input"
                                        type="text"
                                        placeholder="User Role ID"
                                    />                                    
                                </div>
                                <div className="six wide field">
                                    <Field name="userTypeName"
                                        component="input"
                                        type="text"
                                        placeholder="User Role Name"
                                    />
                                </div>                                                              
                            </div>
                            <h5>Permissions</h5>
                            <div className="fields">                            
                                <div className="two wide field">
                                    <label htmlFor="permissions.inventory">Inventory</label>
                                </div>  
                                <div className="two wide field">
                                    <Field name="permissions.inventory" id="inventory" component="input" type="checkbox" />
                                </div> 
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="sales">Sales</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.sales" id="sales" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="production">Production</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.production" id="production" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="quality">Quality</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.quality" id="quality" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="costing">Costing</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.costing" id="costing" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="accounting">Accounting</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.accounting" id="accounting" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="hr">HR</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.hr" id="hr" component="input" type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="admin">Admin Previlages</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="permissions.admin" id="admin" component="input" type="checkbox" />
                                </div>
                            </div>
                            <button type="submit" className="ui primary button">Create</button>
                        </form>                       
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return { errorMessage: state };
}
const formWrapped = reduxForm({
    form: 'newUserRole',
})(NewUserRole);
export default connect(mapStateToProps, { createUserRole })(formWrapped);