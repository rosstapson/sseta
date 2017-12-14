import React, { Component } from 'react';
import QuestionWidget from './QuestionWidget';

//do this by hand for now, but there'll need to be a Question object that'll take arguments
// like 'multiple-chose' versus 'text' 
export default class QuestionnaireWidget extends Component {
    constructor(props) {
        super(props);
        this.state= {
            questions: [
                {id: 1, question: "I was inducted into the program", answer: "3"},
                {id: 2, question: "This program is in line with what was explained to me before I signed up", answer: "3"},
                {id: 3, question: "I know what my allottedstipend amount is.", answer: "3"},
                {id: 4, question: "Stipend allocation:", answer: "", type: "text"},
                {id: 5, question: "My stipend will be lower if I miss classes or work", answer: "3"},
                {id: 6, question: "My employer has explained the workplace policies & procedures", answer: "3"},
                {id: 7, question: "I understand what an assessment is", answer: "3"},
                {id: 8, question: "I know who my mentor is", answer: "3"},
                {id: 9, question: "My work place environment is good (e.g. lighting, ventilation, bathroom facilities, etc)", answer: "3"},
            ]
        }
    }
    handleAnswer = (answer) => {        
        let tempQ = this.state.questions.slice();
        tempQ.forEach(question => {
            if (question.id === answer.id) {
                question.answer = answer.answer;               
            }
        })        
        this.setState({questions: tempQ});        
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
                    {this.state.questions.map((question) => {
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
