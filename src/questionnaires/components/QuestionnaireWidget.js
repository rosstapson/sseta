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
    handleAnswer = (answer) => {        
        let questionnaire = {...this.state.questionnaire};
        //console.log(questionnaire)
        questionnaire.formEntries.forEach(question => {            
            if (question.id === answer.id) {
                question.answer = answer.answer;
            }
        })
        //console.log(questionnaire)
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
                </tbody>
            </table>
            </div>
        )
    }
}
