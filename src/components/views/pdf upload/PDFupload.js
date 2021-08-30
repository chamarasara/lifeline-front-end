import React from 'react';

export default class PdfUpload extends React.Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
        );
    }

    render() {
        const { input: { value } } = this.props

        return (<input
            type="file"
            value={value}
            onChange={this.onChange}
        />)
    }
}
