import React, { Component } from 'react';

export default class QuestionnaireListItem extends Component {
    preview = () => {
        this.props.preview(this.props.questionnaire.id);
    }
    render() {
        return (
           <tr>            
            <td>{this.props.questionnaire.name}</td>
            <td>{this.props.questionnaire.reference}</td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.preview}>Preview</button></td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}>Edit</button></td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}>Delete</button></td> 
            </tr>
        )
    }
}