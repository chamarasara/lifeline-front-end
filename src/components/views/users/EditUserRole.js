import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserRole } from "../../../actions";
class EditUserRole extends React.Component{
    componentDidMount() {
        //this.props.fetchUsersRoles()
        
        this.props.fetchUserRole(this.props.match.params.id)
        console.log(this.props.match.params.id)
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
    submit = (values) => {
        this.props.createUserRole(values)
        console.log(values)
    }
    render(){   
        if (!this.props.userRole) {
            return <div>User Role not selected. Please select a User Role from the list</div>
        }     
        console.log(this.props.userRole.quality)
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
                                    <Field name="inventory" id="inventory" component={this.renderInput} checked={this.props.userRole.inventory} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="sales">Sales</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="sales" id="sales" component={this.renderInput} checked={this.props.userRole.sales} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="production">Production</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="production" id="production" component={this.renderInput} checked={this.props.userRole.production} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="quality">Quality</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="quality" id="quality" component="input" checked={this.props.userRole.quality} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="costing">Costing</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="costing" id="costing" component="input" checked={this.props.userRole.costing} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="accounting">Accounting</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="accounting" id="accounting" component="input" checked={this.props.userRole.accounting} type="checkbox" />
                                </div>
                            </div>
                            <div className="fields">
                                <div className="two wide field">
                                    <label htmlFor="hr">HR</label>
                                </div>
                                <div className="two wide field">
                                    <Field name="hr" id="hr" component="input" checked={this.props.userRole.hr} type="checkbox" />
                                </div>
                            </div>
                            <button type="submit" className="ui primary button">Update   </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownPorps) => {
    console.log(state.userRoles[ownPorps.match.params.id])
    
    return {  userRole: state.userRoles[ownPorps.match.params.id] };
}
const formWrapped = reduxForm({
    form: 'editUserRole',
})(EditUserRole);
export default connect(mapStateToProps, { fetchUserRole })(formWrapped);