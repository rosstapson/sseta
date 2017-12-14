import React, { Component } from 'react';
import AnswerWidget from './AnswerWidget';

export default class QuestionWidget extends Component {
    constructor(props) {
        super(props);
        // console.log("answer: " + this.props.question.answer)
        this.state = {
            id: this.props.question.id,
            question: this.props.question,
            answer: this.props.question.answer
            }
        }
        handleAnswer = (event) => {            
            let answer = {...this.state};
            answer.answer = event.target.value;
            this.props.handleAnswer(answer)
        }
        componentWillReceiveProps(nextProps) {
            this.setState({ data: nextProps.data });  
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
                                {this.state.id}: {this.state.question.question}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <AnswerWidget 
                                        handleAnswer={this.handleAnswer} 
                                        question = {this.props.question}                                        
                                        id={this.props.question.id}
                                        type = {this.props.question.type}
                                        answer={this.props.question.answer}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
