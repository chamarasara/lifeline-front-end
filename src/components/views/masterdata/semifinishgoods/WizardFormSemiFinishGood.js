import React, { Component } from 'react'
import { connect } from 'react-redux';
import NewSemiFinishGood from './NewSemiFinishGood';
import SemiFinishGoodMrpOne from './SemiFinishGoodMrpOne';
import SemiFinishGoodMrpTwo from './SemiFinishGoodMrpTwo';
import SemiFinishGoodMrpThree from './SemiFinishGoodMrpThree';
import SemiFinishGoodMrpFour from './SemiFinishGoodMrpFour';
import SemiFinishGoodPlantDataOne from './SemiFinishGoodPlantDataOne';
import SemiFinishGoodPlantDataTwo from './SemiFinishGoodPlantDataTwo';
import {createSemiFinishGood} from '../../../../actions';

class WizardFormSemiFinishGood extends Component {
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
    onSubmit = (values) =>{
        this.props.createSemiFinishGood(values)
        console.log(values)
    }

    render() {
        const { page } = this.state
        return (
            <div>
                {page === 1 && <NewSemiFinishGood onSubmit={this.nextPage} />}
                {page === 2 && (
                    <SemiFinishGoodMrpOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <SemiFinishGoodMrpTwo
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 4 && (
                    <SemiFinishGoodMrpThree
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 5 && (
                    <SemiFinishGoodMrpFour
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 6 && (
                    <SemiFinishGoodPlantDataOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 7 && (
                    <SemiFinishGoodPlantDataTwo
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
export default connect(null, { createSemiFinishGood })(WizardFormSemiFinishGood);
