import React, { Component } from 'react';
//import QuestContainer from './questionnaires/containers/QuestContainer';
import QuestionnaireList from './questionnaires/containers/QuestionnaireList';
import CaptureContainer from './capture/containers/CaptureContainer';
import UserList from './users/containers/UserList';
import './App.css';
//import { API_ROOT } from './config';
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
                
                {this.state.isAdmin &&
                    <CaptureContainer />
                }                
                {this.state.isAdmin && 
                    <UserList />
                }                
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