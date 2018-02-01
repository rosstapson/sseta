import React, { Component } from 'react';
//import QuestContainer from './questionnaires/containers/QuestContainer';
import QuestionnaireList from './questionnaires/containers/QuestionnaireList';
import CaptureContainer from './capture/containers/CaptureContainer';
import LearnerContainer from './learner/containers/LearnerContainer';
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
        this.state = {
            role: role,
            user: this.props.user,
            questionnairePending: true,
            showTakeQuestionnaire:false,
            //role stuff for display
            isAdmin: role.indexOf('admin'),
            isTeacher: role.indexOf('teacher'),
            isLearner: role.indexOf('learner')
        }
    }
    
    toggleQuestionnaire = () => {
        this.setState({
            questionnairePending: !this.state.questionnairePending,
            showTakeQuestionnaire: !this.state.showTakeQuestionnaire
        })
    }    
    
    render() {
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h1 className="App-intro">Welcome back</h1><br/>
                <LearnerContainer />
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