import React, { Component } from 'react';

import { API_ROOT } from '../../config';

import QuestContainer from '../../questionnaires/containers/QuestContainer';

export default class LearnerContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnairePending: true,
            pendingQuestionnaires: [15]
        }
    }
    handleCancel = () => {
        this.setState({
            showTakeQuestionnaire: false,
            questionnairePending: true
        })
    }
showQuestionnaire = () => {
    let config = {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({id: this.state.pendingQuestionnaires[0], token: localStorage.getItem("token")})
        
    }
    try {
        return fetch(API_ROOT + "/get_questionnaire", config)
            .then(response =>
                {
                    if (!response.ok) {
                        alert("Unable to retrieve Questionnaire");
                        return;
                    }
                    else {                          
                        response.json().then(json => {
                            // server returns questionnaire
                        this.setState({
                            questionnaire: json,                                
                            showList: false,
                            questionnairePending: false,
                            showTakeQuestionnaire: true});
                        });                  
                    }
                });
            
        }
        catch(err) {
            alert(err);
        }
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
                onClick={this.showQuestionnaire}>Go to questionnaire</button></div>
            }
            {this.state.showTakeQuestionnaire &&
                <QuestContainer
                    questionnaire={this.state.questionnaire}
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            }</div>
        )
    }
}