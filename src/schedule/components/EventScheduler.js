import React, { Component } from 'react';

import Datetime from 'react-datetime';
import ParticipantWidget from './ParticipantWidget';

import './react-datetime.css';

export default class EventScheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            conferences: this.props.conferences,
            questionnaires: this.props.questionnaires,
            participants: '',
            event: { eventType: "Questionnaire" },
            yesterday: Datetime.moment().subtract( 1, 'day' )
        }
    }
    handleSubmit = () => {
        let eventId = '';
        if (this.state.event.eventType === "Questionnaire") {
            eventId = this.state.event.questionnaire;            
        }
        else {
            eventId = this.state.event.conference;            
        }
        let schedule = {events: []};
        this.state.participants.forEach(participant => {
            schedule.events.push({
                userId: participant.id, 
                eventId: eventId, 
                eventType: this.state.event.eventType, 
                dateTime: this.state.event.dateTime
            });
        })
        this.props.handleSubmit(schedule);
    }
    handleChange = (changeEvent) => {
        let event = {...this.state.event};
        event[changeEvent.target.id] = changeEvent.target.value;
        //console.log(event)
        this.setState({ event: event })
    }
    handleDatetimeChange = (current) => {
        let event = {...this.state.event};
        event.dateTime = current.toJSON();
        this.setState ({event: event});
        //console.log(this.state);        
    }
    handleParticipantsChange = (participants) => {
        //console.log("participant change")
        this.setState({participants: participants})
    }
    valid = ( current ) => {
        return current.isAfter( this.state.yesterday );
    }
    render() {
        //let date = new Date();
        return(
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <table><tbody>
            <tr><td colSpan={4}><h1 className="App-intro">New Event</h1></td></tr>
            <tr><td><h4>Event type:</h4></td><td>
            <select 
                id={"eventType"}            
                defaultValue={this.state.event.eventType}
                onChange={this.handleChange}
            >
                <option value="Questionnaire">Questionnaire</option>
                <option value="Conference">Conference</option>
            </select>            
            </td></tr>
            {this.state.event.eventType === "Conference" &&
                <tr><td><h4>Conference</h4></td>
                <td>
                <select 
                id={"conference"}            
                defaultValue={this.state.conferences[0]}
                onChange={this.handleChange}
                >
                {
                    this.state.conferences.map(conference => {
                        return <option value={conference.id} key={conference.id}>{conference.name}</option>
                    })
                }
                </select>
                </td></tr>
            }
            {this.state.event.eventType === "Questionnaire" &&
                <tr><td><h4>Questionnaire</h4></td>
                <td>
                <select 
                id={"questionnaire"}            
                defaultValue={this.state.questionnaires[0]}
                onChange={this.handleChange}
                >
                {
                    this.state.questionnaires.map(questionnaire => {
                        return <option value={questionnaire.id} key={questionnaire.id}>{questionnaire.name}</option>
                    })
                }
                </select>
                </td></tr>
            }
            <tr><td><h4>Reference</h4></td><td>
                <input 
                    type='text'
                    id={"reference"}
                    onChange={this.handleChange}
                />
            </td></tr>
            <tr><td><h4>Date/Time</h4></td><td>
                <Datetime 
                    input={ true } 
                    id={"dateTime"}
                    dateFormat={true}
                    onChange={this.handleDatetimeChange}
                    isValidDate={this.valid}
                />
            </td></tr>
            <tr><td><h4>Participants:</h4></td><td>
                <ParticipantWidget 
                    users={this.state.users}
                    handleParticipantsChange={this.handleParticipantsChange}
                />
            </td></tr>
            <tr><td>
            <button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.handleSubmit}
                >Submit</button>
            </td><td>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    onClick={this.props.hideMe}
                    >Close</button>
                    </td></tr>
            </tbody></table>
            </div>
        )
    }
}