import React, { Component } from 'react';
//import cuid from 'cuid';
//import ScheduleItem from '../components/ScheduleItem';
import EventScheduler from '../components/EventScheduler';
import Schedule from '../components/Schedule';

import { API_ROOT } from '../../config';

export default class ScheduleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMySchedule: false,
            showScheduleEvent: false,
            id: this.props.id
        }
    }
    hideMe = () => {
        this.setState({showMySchedule: false, showScheduleEvent: false})
    }
    handleSubmit = (scheduleEntries) => { //scheduleEntries will be {entries: [{user_id, event_type, date_time, e}]}
        alert('submitted');
        this.setState({showMySchedule: false, showScheduleEvent: false})
    }
    showMySchedule = () => {
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
                            this.setState({ showMySchedule: true , events: json});
                          });                  
                        }
                    });
                
            }
            catch(err) {
                alert(err);
            }
    }
    showScheduleEvent = () => {
        try {
            let config = {
                method: 'post',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify({email: localStorage.getItem("email"), token: localStorage.getItem("token")})
              }
              return fetch(API_ROOT + "/user_list", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                  if (!response.ok) {
                    throw new Error("Unable to retrieve user list")
                  }
                  this.setState({users: json, showScheduleEvent: true})
                })
                .catch(err => {                    
                    alert(err)
                }); 
        }
        catch(err) {
            alert(err.message);
        }         
    }
    render() {
        return(
            <div style={{
                borderStyle: "solid",
                borderColor: '#62DFF8', 
                padding: '10px',
                width: "50%",
                alignSelf: "center"}}>
            {this.state.showMySchedule &&
                <Schedule 
                    events={this.state.events}
                    hideMe={this.hideMe}
                />
            }
            {this.state.showScheduleEvent &&
                <EventScheduler
                    users={this.state.users}
                    hideMe={this.hideMe}
                    handleSubmit={this.handleSubmit}
                />
            }
            {!this.state.showScheduleEvent && !this.state.showMySchedule &&
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.showMySchedule}>My Schedule</button>
            }
            {localStorage.getItem('isAdmin') && !this.state.showScheduleEvent && !this.state.showMySchedule &&
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.showScheduleEvent}>Schedule an Event</button>
            }
            </div>
        )
    }
}