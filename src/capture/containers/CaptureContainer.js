import React, { Component } from 'react';
import QuestionnaireMaker from '../components/QuestionnaireMaker';

export default class CaptureContainer extends Component {

    render() {
        return(
            <div><QuestionnaireMaker 
                saveQuestionnaire={this.props.saveQuestionnaire}
                handleCancel={this.props.handleCancel}
            /></div>
        )
    }
}