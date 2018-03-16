import React, { Component } from 'react';
import cuid from 'cuid';
import ScheduleItem from './ScheduleItem';

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: this.props.events
        }
    }
    render() {
        return(
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <table><tbody>
            <tr><td colSpan={4}><h1 className="App-intro">My Schedule</h1></td></tr>
            <tr >
            <th style={{padding: '10px'}}>Event type</th>
            <th style={{padding: '10px'}}>Date/Time</th><td></td>
            <th style={{padding: '10px'}}>Status</th><td></td>
            </tr>
            {this.state.events.map(event => {
                return <ScheduleItem 
                    key={cuid()}
                    eventType={event.event_type}
                    dateTime={event.date_time}
                    status={event.status}
                />
            })}
            <tr><td></td></tr>
        <tr><td></td><td>
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