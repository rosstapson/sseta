import React, { Component } from 'react';
//import QuestContainer from './questionnaires/containers/QuestContainer';
import QuestionnaireList from './questionnaires/containers/QuestionnaireList';
import CaptureContainer from './capture/containers/CaptureContainer';
import LearnerContainer from './learner/containers/LearnerContainer';
import ScheduleContainer from './schedule/containers/ScheduleContainer';
import TemplateContainer from './template/containers/TemplateContainer';
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
        // isAdmin: role.indexOf('admin'),
        // isTeacher: role.indexOf('teacher'),
        // isLearner: role.indexOf('learner')
        if (role.indexOf('admin') > -1) {
            localStorage.setItem("isAdmin", true);
        }
        if (role.indexOf('teacher') > -1) {
            localStorage.setItem("isTeacher", true);
        }
        if (role.indexOf('learner') > -1) {
            localStorage.setItem("isLearner", true);
        }
        this.state = {
            role: role,
            user: this.props.user,
            questionnairePending: true,
            showTakeQuestionnaire:false,
            //role stuff for display            
        }
    }
    arbTest = () => {
        let x = 15;
        let binString = x.toString(2);
        console.log(binString);
        let y = 5; 
        console.log(y.toString(2));
        console.log((x & y).toString(2))
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
                <ScheduleContainer 
                    id={localStorage.getItem("id")}
                />
                <LearnerContainer />
                {localStorage.getItem("isAdmin") &&
                    <TemplateContainer />
                }
                {localStorage.getItem("isAdmin") &&
                    <QuestionnaireList />
                }
                {localStorage.getItem("isAdmin") &&
                    <CaptureContainer />
                }                
                {localStorage.getItem("isAdmin") && 
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
                    onClick={this.arbTest}>Arb Test</button>
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