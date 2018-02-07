import React, { Component } from 'react';

import Datetime from 'react-datetime';
import ParticipantWidget from './ParticipantWidget';

import './react-datetime.css';

export default class EventScheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users,
            filteredUsers: '',
            event: {},
            yesterday: Datetime.moment().subtract( 1, 'day' )
        }
    }
    handleChange = (changeEvent) => {
        let event = {...this.state.event};
        event[changeEvent.target.id] = changeEvent.target.value;
        this.setState({ event: event })
    }
    handleDatetimeChange = (current) => {
        let event = {...this.state.event};
        event.dateTime = current.toJSON();
        this.setState ({event: event});
        console.log(this.state);        
    }
    handleParticipantsChange = (changeEvent) => {
        console.log(changeEvent);
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
                defaultValue={"Questionnaire"}
                onChange={this.handleChange}
            >
            <option value="Questionnaire">Questionnaire</option>
            <option value="Conference">Conference</option>
            </select>
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
                    onChange={this.handleParticipantsChange}
                />
            </td></tr>
            <tr><td>
            <button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.props.handleSubmit}
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