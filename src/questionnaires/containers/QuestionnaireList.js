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
            <tr>
            <th>Title</th><th>Reference</th><td></td><td></td>
            </tr>
            {this.state.questionnaires.map(questionnaire => {
                return <QuestionnaireListItem
                    key={questionnaire.id}
                    questionnaire={questionnaire}
                />
            })}
            </tbody></table>
            </div>
        )
    }
}