import React, { Component } from 'react';
import QuestionnaireWidget from '../components/QuestionnaireWidget';
import {API_ROOT} from '../../config';

export default class QuestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreview: this.props.isPreview,
            result: [],
            questionnaire: this.props.questionnaire
        }
    }
    handleSubmit = (answers) => {
        // fetch etc.
        let result = {};
        result.userId = localStorage.getItem("id");
        result.questionnaireId = this.state.questionnaire.id;
        result.answers = answers;        
        if (this.state.isPreview) {
            alert("Submit (Preview)");
            return;
        }
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({result: result, token: localStorage.getItem("token")})
            
        }
        try {
            return fetch(API_ROOT + "/answers", config)
                .then(response =>
                    {
                        if (!response.ok) {
                            alert("Unable to post answers");
                            return;
                        }
                        else {                          
                          response.json().then(json => {
                              // server returns questionnaire
                            alert("Answers posted successfully")
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
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                
            }}>
                <h1 className="App-intro">{this.state.questionnaire.name}</h1><br/><br/><br/>
                <QuestionnaireWidget                
                    questionnaire={this.state.questionnaire}
                    handleCancel={this.props.handleCancel}
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}