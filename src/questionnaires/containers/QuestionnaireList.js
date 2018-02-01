import React, { Component } from 'react';
import QuestionnaireListItem from '../components/QuestionnaireListItem';
import QuestContainer from './QuestContainer';
import {API_ROOT} from '../../config';
//import {getMyQuestionnaires} from '../api';

export default class QuestionnaireList extends Component {
    constructor(props) {
        super(props);
        this.state={
            questionnaires: this.props.questionnaires,
            showList: this.props.showList,
            previewQuestionnaire: '',
            showTakeQuestionnaire: false
        }
    }

    showList = () => {        
        try {
            let config = {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({email: localStorage.getItem("username"), token: localStorage.getItem("token")})
              }
              return fetch(API_ROOT + "/questionnaire_list", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                  if (!response.ok) {
                    throw new Error("zomg")
                  }
                  this.setState({questionnaires: json, showList: true})
                })
                .catch(err => {                    
                    alert(err)
                }); 
            
                      
        }
        catch(err) {
            alert(err.message);
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
                                showList: false,
                                showTakeQuestionnaire: true});
                          });                  
                        }
                    });
                
            }
            catch(err) {
                alert(err);
            }        
    }
   
    toggleDisplay = () => {
        this.setState({showList: !this.state.showList})
    }
    handleCancel = () => {
        this.setState({
            showTakeQuestionnaire: false,
            showList: true
        })
    }
    
    render() {
        if (this.state.showList) {
            return(            
                <div style={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    }}>                    
                <table><tbody>
                <tr><td colSpan={4}><h1 className="App-intro">My Questionnaires</h1></td></tr>
                <tr >
                <th style={{padding: '10px'}}>Title</th>
                <th style={{padding: '10px'}}>Reference</th><td></td>
                <th style={{padding: '10px'}}>Actions</th><td></td>
                </tr>
                {this.state.questionnaires.map(questionnaire => {
                    return <QuestionnaireListItem
                        key={questionnaire.id}
                        questionnaire={questionnaire}
                        preview={this.preview}
                    />
                })}
                <tr><td></td><td></td></tr>
                <tr><td></td><td>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    onClick={this.toggleDisplay}
                    >Close</button>
                    </td></tr>
                </tbody></table>
                </div>
            )
        }
        else {            
            if (this.state.showTakeQuestionnaire) {
                return(
                    <QuestContainer
                        isPreview={'yes'}
                        questionnaire={this.state.previewQuestionnaire}
                        handleCancel={this.handleCancel}
                    />
                )
            } else {
                return(
                    <div style={{
                        borderStyle: "solid",
                        borderColor: '#62DFF8', 
                        padding: '10px',
                        width: "50%",
                        alignSelf: "center"}}><button style={{
                        padding: '10px',
                        backgroundColor: '#62DFF8'
                    }}
                    onClick={this.showList}>My Questionnaires</button></div>
                )
            }
        }
    }
}