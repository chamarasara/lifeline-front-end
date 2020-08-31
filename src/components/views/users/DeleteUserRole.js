import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../Modal';
import history from '../../history'; 
import { deleteUserRole, fetchUserRole } from "../../../actions";

class DeleteUserRole extends React.Component{

    componentDidMount() {
        console.log(this.props)
        this.props.fetchUserRole(this.props.match.params.id);
    }
    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteUserRole(id)} className="ui red button">Delete</button>
                <Link to={`/user-role/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.userRole) {
            return 'Are you sure about deleting this User Role ? '
        }
        return `Are you sure about deleting User Role: ${this.props.userRole.userTypename}`
    }
    render() {
        return (
            <Modal header="Delete User Role" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/user-role/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(ownPorps.match.params.id)
    console.log(state)
    console.log(ownPorps)
    return { userRole: state.userRoles[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { deleteUserRole, fetchUserRole })(DeleteUserRole);