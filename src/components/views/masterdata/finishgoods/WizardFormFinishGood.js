import React, { Component } from 'react'
import { connect } from 'react-redux';
import NewFinishGood from './NewFinishGood';
import FinishGoodMrpOne from './FinishGoodMrpOne';
import FinishGoodMrpTwo from './FinishGoodMrpTwo';
import FinishGoodMrpThree from './FinishGoodMrpThree';
import FinishGoodMrpFour from './FinishGoodMrpFour';
import FinishGoodPlantDataOne from './FinishGoodPlantDataOne';
import FinishGoodPlantDataTwo from './FinishGoodPlantDataTwo';
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
                {page === 1 && <NewFinishGood onSubmit={this.nextPage} />}
                {page === 2 && (
                    <FinishGoodMrpOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <FinishGoodMrpTwo
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 4 && (
                    <FinishGoodMrpThree
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 5 && (
                    <FinishGoodMrpFour
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 6 && (
                    <FinishGoodPlantDataOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 7 && (
                    <FinishGoodPlantDataTwo
                        previousPage={this.previousPage}
                        onSubmit={this.onSubmit}
                    />
                )}
            </div>
        )
    }
}

// WizardForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired
// }
export default connect(null, { createFinishGood })(WizardFormFinishGood);
