import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { deleteEmployee, fetchEmployee } from "../../../../actions";

class DeleteMasterEmployee extends React.Component {

    componentDidMount() {
        this.props.fetchEmployee(this.props.match.params.id);
    }
    renderActions() {       
        
        if (!this.props.employee) {
            return (
                <div className="ui active inline loader"></div>
            )
        }       
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteMasterEmployee(this.props.employee._id)} className="ui red button">Delete</button>
                <Link to={`/employee-master-profile/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.employee) {
            return 'Are you sure about deleting this Employee ? '
        }
        return `Are you sure about deleting this Employee ${this.props.employee.employeeName} ?`
    }
    render() {
        return (
            <Modal header="Delete Employee" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/employee-master-profile/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    console.log(state.distributor[ownPorps.match.params.id])
    return { employee: state.employee[ownPorps.match.params.id] };
}
export default connect(mapToSatate, { deleteEmployee, fetchEmployee })(DeleteMasterEmployee);