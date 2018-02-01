import React, { Component } from 'react';
import cuid from 'cuid';
import ScheduleItem from '../components/ScheduleItem';

import { API_ROOT } from '../../config';

export default class ScheduleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSchedule: false,
            id: this.props.id
        }
    }
    hideMe = () => {
        this.setState({showSchedule: false})
    }
    showSchedule = () => {
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({id: this.state.id, token: localStorage.getItem("token")})
            
        }
        try {
            return fetch(API_ROOT + "/schedule", config)
                .then(response =>
                    {
                        if (!response.ok) {
                            alert("Unable to retrieve schedule");
                            return;
                        }
                        else {                          
                          response.json().then(json => {
                              //console.log(json)
                            this.setState({ showSchedule: true , events: json});
                          });                  
                        }
                    });
                
            }
            catch(err) {
                alert(err);
            }        
        
    }
    render() {
        if (this.state.showSchedule) {
            return(            
                <div style={{
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
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
                    onClick={this.hideMe}
                    >Close</button>
                    </td></tr>
                </tbody></table>
                </div>
            )
        }
        else {
            return(
                <div style={{
                    borderStyle: "solid",
                    borderColor: '#62DFF8', 
                    padding: '10px',
                    width: "50%",
                    alignSelf: "center"}}><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.showSchedule}>My Schedule</button></div>
            )
        }
        
    }
}