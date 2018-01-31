import React, { Component } from 'react';
import QuestionnaireMaker from '../components/QuestionnaireMaker';
import {API_ROOT} from '../../config';

export default class CaptureContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arb: false
        }
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
                            alert("Questionnaire saved");
                            let myQuestionnaires = this.state.myQuestionnaires.slice();
                            myQuestionnaires.push(json.questionnaire)
                            this.setState({showCapture: false, myQuestionnaires: myQuestionnaires});
                          });                  
                        }
                    })
                    .catch(err => {                    
                        alert(err)
                    }); 
                
            }
            catch(err) {
                alert(err);
            }
    }
    showMe = () => {
        this.setState({showCapture:true})
    }
    hideMe = () => {       
        this.setState({showCapture: false})
    }
    render() {
        if (this.state.showCapture) {
            return(
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}>
                    <QuestionnaireMaker 
                    saveQuestionnaire={this.saveQuestionnaire}
                    handleCancel={this.hideMe}
                />
                </div>
            
            )
        }
            else {
                return (
                    <div style={{
                        borderStyle: "solid",
                        borderColor: '#62DFF8', 
                        padding: '10px',
                        width: "50%",
                        alignSelf: "center"}}>
                        <button style={{
                            padding: '10px',
                            backgroundColor: '#62DFF8'
                        }}
                        onClick={this.showMe}>Capture Questionnaire</button>
                    </div>
            )
        }
        
    }
}