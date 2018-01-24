import React, { Component } from 'react';
import QuestionnaireListWidget from '../components/QuestionnaireListWidget';

export default class QuestionnaireList extends Component {
    constructor(props) {
        super(props);
        this.state={
            questionnaireIds: this.props.questionnaireIds
        }
    }
    render() {
        return(
            <QuestionnaireListWidget />
        )
    }
}