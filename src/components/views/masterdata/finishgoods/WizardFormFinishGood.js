import React, { Component } from 'react'
import { connect } from 'react-redux';
import NewFinishGood from './NewFinishGood';

import { createFinishGood } from '../../../../actions';

class WizardFormFinishGood extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1
        }
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }
    onSubmit = (values) => {
        this.props.createFinishGood(values)
        console.log(values)
    }

    render() {
        const { page } = this.state
        return (
            <div>
                {page === 1 && <NewFinishGood onSubmit={this.onSubmit} />}
            </div>
        )
    }
}

// WizardForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired
// }
export default connect(null, { createFinishGood })(WizardFormFinishGood);
