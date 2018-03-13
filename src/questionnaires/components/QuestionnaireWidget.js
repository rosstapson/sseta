import React, { Component } from 'react';
import QuestionWidget from './QuestionWidget';

//do this by hand for now, but there'll need to be a Question object that'll take arguments
// like 'multiple-chose' versus 'text' 
export default class QuestionnaireWidget extends Component {
    constructor(props) {
        super(props);
        let questionnaire = this.props.questionnaire;
        questionnaire.formEntries.forEach(question => {
            if (!question.answer && question.answer_type !== 'Text') {
                question.answer = '3';                
            }
        })
        this.state= {           
            questionnaire: questionnaire
        }
    }
    handleSubmit = () => {
        let answers = [];
        this.state.questionnaire.formEntries.forEach(question => {
            answers.push({questionId: question.id, answer: question.answer})
            //answers[question.id] = question.answer;
        })
        this.props.handleSubmit(answers);
    }
    handleAnswer = (answer) => {        
        let questionnaire = {...this.state.questionnaire};
        questionnaire.formEntries.forEach(question => {            
            if (question.id === answer.id) {
                question.answer = answer.answer;
            }
        });
        this.setState({questionnaire: questionnaire});        
    }
    
    render() {       
        return(
            <div style={{          
                display: 'flex',
                flex: '1',
                flexDirection: 'row',
                justifyContent: 'center',
               
              }}>
              
            <table>
                <tbody>
                    {this.state.questionnaire.formEntries.map((question) => {
                       return( 
                           <tr key={question.id}><td>
                            <QuestionWidget                                                                
                                question={question}                                
                                handleAnswer={this.handleAnswer}
                            />
                            </td></tr>
                       )
                    })}
                    <tr><td>
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
                </td></tr>
                </tbody>
            </table>
            </div>
        )
    }
}
