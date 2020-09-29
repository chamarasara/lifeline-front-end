import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history';
import { deleteUser, fetchUser } from "../../../actions";

class DeleteUser extends React.Component {

    componentDidMount() {
        console.log(this.props.match.params._id)
        this.props.fetchUser(this.props.match.params._id);
    }
    renderActions() {
       
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteUser(this.props.match.params._id)} className="ui red button">Delete</button>
                <Link to={`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.user) {
            return `Are you sure about deleting this User ? `
        }
        return `Are you sure about deleting this User  ${this.props.user.firstName }?`
    }
    render() {
        return (
            <Modal header="Delete User" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/userprofile/${this.props.match.params._id}/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    return { user: state.users[ownPorps.match.params._id] };
}
export default connect(mapToSatate, { deleteUser, fetchUser })(DeleteUser);