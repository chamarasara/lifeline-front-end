import React, { Component } from 'react'
import { connect } from 'react-redux';
import NewPackingMaterial from './NewPackingMaterial';
import PackingMaterialMrpOne from './PackingMaterialMrpOne';
import PackingMaterialMrpTwo from './PackingMaterialMrpTwo';
import PackingMaterialMrpThree from './PackingMaterialMrpThree';
import PackingMaterialMrpFour from './PackingMaterialMrpFour';
import PackingMaterialPlantDataOne from './PackingMaterialPlantDataOne';
import PackingMaterialPlantDataTwo from './PackingMaterialPlantDataTwo';
import {createPackingaterial} from '../../../../actions';

class WizardFormPacking extends Component {
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
        this.props.createPackingaterial(values)
        console.log(values)
    }

    render() {
        const { page } = this.state
        return (
            <div>
                {page === 1 && <NewPackingMaterial onSubmit={this.nextPage} />}                
                {page === 2 && (
                    <PackingMaterialPlantDataOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <PackingMaterialPlantDataTwo
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
export default connect(null, { createPackingaterial })(WizardFormPacking);
