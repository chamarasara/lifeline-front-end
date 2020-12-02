import React from 'react'
import { connect } from 'react-redux';
import NewRawMaterial from './NewRawMaterial';
import RawMaterialMrpOne from './RawMaterialMrpOne';
import RawMaterialMrpTwo from './RawMaterialMrpTwo';
import RawMaterialMrpThree from './RawMaterialMrpThree';
import RawMaterialMrpFour from './RawMaterialMrpFour';
import RawMaterialPlantDataOne from './RawMaterialPlantDataOne';
import RawMaterialPlantDataTwo from './RawMaterialPlantDataTwo';
import {createRawMaterial} from '../../../../actions';

class WizardForm extends React.Component {
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
        console.log(values)
        this.props.createRawMaterial(values)
    }

    render() {
        // const { onSubmit } = this.props
        
        const { page } = this.state
        return (
            <div>
                {page === 1 && <NewRawMaterial onSubmit={this.nextPage} />}                
                {page === 2 && (
                    <RawMaterialPlantDataOne
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage}
                    />
                )}
                {page === 3 && (
                    <RawMaterialPlantDataTwo
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

export default connect(null, { createRawMaterial })(WizardForm);
