import React, { Component } from 'react';
//import QuestContainer from './questionnaires/containers/QuestContainer';
import QuestionnaireList from './questionnaires/containers/QuestionnaireList';
import CaptureContainer from './capture/containers/CaptureContainer';
import UserContainer from './users/containers/UserContainer';
import './App.css';
import { API_ROOT } from './config';
import jwt from 'jsonwebtoken';
import './components.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        let token = localStorage.getItem("token");
        let role = jwt.decode(token).role;
        // console.log(role);        
        // console.log(role.indexOf('asdf'));
        this.state = {
            role: role,
            user: this.props.user,
            questionnairePending: false,
            showTakeQuestionnaire:false,
            showCapture: false,
            showMyQuestionnaires: false,
            myQuestionnaires: [],
            previewQuestionnaire: {},
            showUsers: false,
            //role stuff for display
            isAdmin: role.indexOf('admin'),
            isTeacher: role.indexOf('teacher'),
            isLearner: role.indexOf('learner')
        }
    }
    
    toggleQuestionnaire = () => {
        this.setState({
            //questionnairePending: !this.state.questionnairePending,
            showTakeQuestionnaire: !this.state.showTakeQuestionnaire
        })
    }
    toggleQuestionnaireList = () => {
        this.setState({ showMyQuestionnaires: !this.state.showMyQuestionnaires})
    }
    toggleCapture = () => {
        this.setState({ showCapture: !this.state.showCapture})
    }
    toggleUsers = () => {
        this.setState({showUsers: !this.state.showUsers})
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
    
    
    render() {
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
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
                {this.state.isAdmin &&
                    <QuestionnaireList />
                }
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}>
                {!this.state.showCapture && this.state.isAdmin &&
                    <button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.toggleCapture}>Capture Questionnaire</button>
                }
                {this.state.showCapture && this.state.isAdmin &&
                    <CaptureContainer
                        saveQuestionnaire={this.saveQuestionnaire}
                        handleCancel={this.toggleCapture} 
                    />
                }
                </div>
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}>
                {!this.state.showUsers &&
                    <button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.toggleUsers}>Users</button>
                }
                {this.state.showUsers && 
                    <UserContainer />
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