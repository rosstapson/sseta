import React, { Component } from 'react';
import QuestContainer from './questionnaires/containers/QuestContainer';
import './App.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            questionnairePending: true,
            showQuestionnaire:false
        }
    }
    toggleQuestionnaire = () => {
        this.setState({
            questionnairePending: !this.state.questionnairePending,
            showQuestionnaire: !this.state.showQuestionnaire
        })
    }
    render() {
        return(
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h1 className="App-intro">Welcome back, {this.state.user.username}</h1><br/>
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
                {this.state.showQuestionnaire &&
                    <QuestContainer 
                        handleCancel={this.toggleQuestionnaire}
                        handleSubmit={this.handleSubmit}
                    />
                }
                <br/><br/><br/><br/>
                <div><a href="https://mysseta.slack.com/messages/C8EHYBB52/">Slack Video Conferencing</a></div>
            </div>
        )
    }
}