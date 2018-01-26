import React, { Component } from 'react';
import AnswerWidget from './AnswerWidget';

export default class QuestionWidget extends Component {
    constructor(props) {
        super(props);
        //console.log("answer: " + answer)
        this.state = {         
            question: this.props.question,
            answer: this.props.question.answer
        }
    }
        handleAnswer = (event) => {
            //console.log("on the way up:  " + event.target.value)
            let state = {...this.state};
            state.question.answer = event.target.value;
            this.props.handleAnswer(state.question)
        }
        componentWillReceiveProps(nextProps) {                    
             this.setState({ question: nextProps.question, answer: nextProps.question.answer});  
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
                            <tr>
                                <td>
                                {this.state.question.question_text}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AnswerWidget 
                                        handleAnswer={this.handleAnswer} 
                                        question = {this.props.question}                                        
                                        id={this.state.id}
                                        type = {this.state.question.answer_type}
                                        answer={this.state.answer}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
