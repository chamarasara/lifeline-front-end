import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInAction } from '../../../actions';


class Login extends React.Component{

    submit = (values) => {
        this.props.signInAction(values, this.props.history);      
    }

    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="ui error message">
                    {this.props.errorMessage}
                </div>
            );
        }
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <div className="ui container" style={{ paddingTop: "100px", marginBottom: "10px" }}>
                <div className="ui grid">
                    <div className="three column row">
                        <div className="column"></div>
                        <div className="column">
                            <h2>Sign In</h2>
                            <form onSubmit={handleSubmit(this.submit)} className="ui mini form">
                                <div className="field">
                                    <Field name="userName"
                                        component="input"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="field">
                                    <Field name="password"
                                        component="input"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <button type="submit" className="ui primary button">Sign In</button>
                            </form>
                            {this.errorMessage()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error };
}
const formWrapped = reduxForm({
    form: 'signInAction',
})(Login);
export default connect(mapStateToProps, { signInAction })(formWrapped);