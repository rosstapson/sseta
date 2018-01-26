import React, { Component } from 'react';
import QuestContainer from './questionnaires/containers/QuestContainer';
import QuestionnaireList from './questionnaires/containers/QuestionnaireList';
import CaptureContainer from './capture/containers/CaptureContainer';
import './App.css';
import { API_ROOT } from './config';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            questionnairePending: true,
            showTakeQuestionnaire:false,
            showCapture: false,
            showMyQuestionnaires: false,
            myQuestionnaires: [],
            previewQuestionnaire: {}
        }
    }
    componentDidMount = () => {
        //fetch questionnaire ids names and refs, set state
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({email: localStorage.getItem("username"), token: localStorage.getItem("token")})
        }
        try {
        return fetch(API_ROOT + "/questionnaire_list", config)
            .then(response =>
                {
                    if (!response.ok) {
                        alert("Unable to fetch questionnaire list.");
                    }
                    else {
                        response.json().then(json => {                       
                        this.setState({myQuestionnaires: json });
                      });                  
                    }
                });
            
        }
        catch(err) {
            alert(err);
        }
    }
    toggleQuestionnaire = () => {
        this.setState({
            questionnairePending: !this.state.questionnairePending,
            showTakeQuestionnaire: !this.state.showTakeQuestionnaire
        })
    }
    toggleQuestionnaireList = () => {
        this.setState({ showMyQuestionnaires: !this.state.showMyQuestionnaires})
    }
    toggleCapture = () => {
        this.setState({ showCapture: !this.state.showCapture})
    }
    saveQuestionnaire = (questionnaire) => {
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({questionnaire: questionnaire, token: localStorage.getItem("token")})
            
        }
        try {
            return fetch(API_ROOT + "/questionnaires", config)
                .then(response =>
                    {
                        if (!response.ok) {
                            alert("Unable to save Questionnaire");
                        }
                        else {
                          response.json().then(json => {
                              // server returns questionnaire minus entries,
                              // so we can optimistically update state
                              
                            alert("Questionnaire saved");
                            let myQuestionnaires = this.state.myQuestionnaires.slice();
                            myQuestionnaires.push(json.questionnaire)
                            this.setState({showCapture: false, myQuestionnaires: myQuestionnaires});
                          });                  
                        }
                    });
                
            }
            catch(err) {
                alert(err);
            }
    }
    preview = (id) => {
        
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({id: id, token: localStorage.getItem("token")})
            
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
                                previewQuestionnaire: json,
                                showCapture: false,
                                showMyQuestionnaires: false,
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
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h1 className="App-intro">Welcome back</h1><br/>
                {this.state.questionnairePending &&
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"
                }}>NB! You have 1 questionnaire pending.<br/>Would you like to take it now?
                <br/><br/><br/><br/>
                <button 
                    style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.toggleQuestionnaire}>Go to questionnaire</button></div>
                }
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}} >
                {this.state.showMyQuestionnaires &&
                    <QuestionnaireList 
                        questionnaires={this.state.myQuestionnaires}
                        closeMe={this.toggleQuestionnaireList}
                        preview={this.preview}
                    />
                }
                {!this.state.showMyQuestionnaires &&
                    <button 
                    style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.toggleQuestionnaireList}>See my questionnaires</button>
                }
                </div>
                {this.state.showTakeQuestionnaire &&
                    <QuestContainer
                        isPreview={'yes'}
                        questionnaire={this.state.previewQuestionnaire}
                        handleCancel={this.toggleQuestionnaire}
                        handleSubmit={this.handleSubmit}
                    />
                }
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}>
                {!this.state.showCapture &&
                    <button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.toggleCapture}>Capture Questionnaire</button>
                }
                {this.state.showCapture && 
                    <CaptureContainer
                        saveQuestionnaire={this.saveQuestionnaire}
                        handleCancel={this.toggleCapture} 
                    />
                }
                </div>
                <br/><br/>
                <div><a href="https://mysseta.slack.com/messages/C8EHYBB52/">Slack Video Conferencing</a></div>
                <br/><br/>
                <div>
                <button style={{    
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                    }}
                    onClick={this.props.handleLogout}>Log Out</button>
                </div>
            </div>
        )
    }
}