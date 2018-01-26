import React, { Component } from 'react';
import QuestionnaireListItem from '../components/QuestionnaireListItem';

export default class QuestionnaireList extends Component {
    constructor(props) {
        super(props);
        this.state={
            questionnaires: this.props.questionnaires
        }
    }
    
    render() {
        return(
            
            <div><table><tbody>
            <tr >
            <th style={{padding: '10px'}}>Title</th>
            <th style={{padding: '10px'}}>Reference</th><td></td>
            <th style={{padding: '10px'}}>Actions</th><td></td>
            </tr>
            {this.state.questionnaires.map(questionnaire => {
                return <QuestionnaireListItem
                    key={questionnaire.id}
                    questionnaire={questionnaire}
                    preview={this.props.preview}
                />
            })}
            </tbody></table><br/><br/>
            <button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.props.closeMe}
                >Close</button>
            </div>
        )
    }
}