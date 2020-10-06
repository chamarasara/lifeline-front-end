import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserRole, editUserRole } from "../../../actions";

class EditUserRole extends React.Component{
    componentDidMount() {
        this.props.fetchUserRole(this.props.match.params.id)
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
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
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
    renderInput = ({ input, label, placeholder, type, meta, checked }) => {

        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder} checked={checked} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }
    submit = (formValues) => {
        this.props.editUserRole(this.props.match.params.id,formValues)
        console.log(formValues, this.props.match.params.id)
    }
    render(){   
        if (!this.props.userRole) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }     
        return(
            <div className="pusher">
                <div className="ui basic segment" id="user-role">
                    <h5>Edit User Role {this.props.userRole.userTypeName}</h5>
                    <div className="column">
                        <form onSubmit={this.props.handleSubmit(this.submit)} className="ui mini form">
                            <div className="fields">
                                <div className="six wide field">
                                    <Field name="userTypeCode"
                                        component={this.renderInput} 
                                        type="text"
                                        placeholder={this.props.userRole.userTypeCode}
                                    />
                                </div>
                                <div className="six wide field">
                                    <Field name="userTypeName"
                                        component={this.renderInput} 
                                        type="text"
                                        placeholder={this.props.userRole.userTypeName}
                                    />
                                </div>
                            </div>
                            <h5>Permissions</h5>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="inventory">Inventory</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="inventory" id="inventory" component={this.renderInput} checked={this.props.userRole.permissions.inventory} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="sales">Sales</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="sales" id="sales" component={this.renderInput} checked={this.props.userRole.permissions.sales} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="production">Production</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="production" id="production" component={this.renderInput} checked={this.props.userRole.permissions.production} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="quality">Quality</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="quality" id="quality" component="input" checked={this.props.userRole.permissions.quality} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="costing">Costing</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="costing" id="costing" component="input" checked={this.props.userRole.permissions.costing} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="accounting">Accounting</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="accounting" id="accounting" component="input" checked={this.props.userRole.permissions.accounting} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="hr">HR</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="hr" id="hr" component="input" checked={this.props.userRole.permissions.hr} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="admin">Admin</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="admin" id="admin" component="input" checked={this.props.userRole.permissions.admin} type="checkbox" />
                                </div>
                            </div>
                            <Link to={`/user-role/${this.props.match.params.id}`} className="ui button">Back   </Link>
                            <button type="submit" className="ui primary button">Update   </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {    
    return {  userRole: state.userRoles[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editUserRole',
})(EditUserRole);
export default connect(mapStateToProps, { fetchUserRole, editUserRole })(formWrapped);