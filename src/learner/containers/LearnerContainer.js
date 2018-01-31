import React, { Component } from 'react';

import QuestContainer from '../../questionnaires/containers/QuestContainer';

export default class LearnerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnairePending: true,
            pendingQuestionnaires: [15]
        }
    }
    showQuestionnaire = () => {

    }
    render() {
        return(
            <div style={{
                borderStyle: "solid",
                borderColor: '#62DFF8', 
                padding: '10px',
                width: "50%",
                alignSelf: "center"}}>{this.state.questionnairePending &&
           <div>NB! You have {this.state.pendingQuestionnaires.length} questionnaire(s) pending.<br/>Would you like to take it now?
            <br/><br/><br/><br/>
            <button 
                style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.showTakeQuestionnaire}>Go to questionnaire</button></div>
            }
            {this.state.showTakeQuestionnaire &&
                <QuestContainer
                    questionnaire={this.state.previewQuestionnaire}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            }</div>
        )
    }
}