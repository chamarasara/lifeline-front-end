import React, { Component } from 'react'
import { connect } from 'react-redux';
import NewBom from './NewBom';

import { createBom } from '../../../../actions';

class WizardFormBom extends Component {
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
        this.props.createBom(values)
        console.log(values)
    }

    render() {
        const { page } = this.state
        return (
            <div>
                {page === 1 && <NewBom onSubmit={this.onSubmit} />}
            </div>
        )
    }
}

// WizardForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired
// }
export default connect(null, { createBom })(WizardFormBom);
