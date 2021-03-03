import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Modal from '../../../Modal';
import history from '../../../history';
import { deleteSalary, fetchSalary } from "../../../../actions";

class DeleteSalary extends React.Component {

    componentDidMount() {
        this.props.fetchSalary(this.props.match.params.id);
    }
    renderActions() {       
        
        if (!this.props.salary) {
            return (
                <div className="ui active inline loader"></div>
            )
        }       
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteSalary(this.props.salary._id)} className="ui red button">Delete</button>
                <Link to={`/single-salary/${this.props.match.params.id}`} className="ui cancel button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.salary) {
            return 'Are you sure about deleting this record ? '
        }
        return `Are you sure about deleting this record ${this.props.salary.referanceNumber} ?`
    }
    render() {
        return (
            <Modal header="Delete Salary Record" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push(`/single-salary/${this.props.match.params.id}`)} />
        );
    }
}

const mapToSatate = (state, ownPorps) => {
    const salary = state.salary[ownPorps.match.params.id]
    return { salary };
}
export default connect(mapToSatate, { deleteSalary, fetchSalary })(DeleteSalary);