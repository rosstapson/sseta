import React, { Component } from 'react';
import QuestionnaireWidget from '../components/QuestionnaireWidget';

export default class QuestContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            questionnaire: this.props.questionnaire
        }
    }
    handleSubmit = () => {
        alert("Submitted");
    }
    handleChange = (event) => {       
        let result = {...this.state.result};        
        result[event.question] = event.answer;        
        this.setState({ result: result});        
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
                handleChange={this.handleChange} />
            <div>
            <button 
                style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.handleSubmit}>Submit</button>
            <button 
                style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.props.handleCancel}>Cancel</button>
            </div>
      
              </div>
        )
    }
}