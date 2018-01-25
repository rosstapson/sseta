import React, { Component } from 'react';

export default class QuestionnaireListItem extends Component {
    render() {
        return (
           <tr>            
            <td>{this.props.questionnaire.name}</td>
            <td>{this.props.questionnaire.reference}</td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}>View</button></td>
                <td><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}>Edit</button></td>            
            </tr>
        )
    }
}