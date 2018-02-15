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
    handleSubmit = (schedule) => { //scheduleEntries will be {schedule: [event.userId, event.eventId, event.eventType, event.dateTime,}
    //console.log(scheduleEntries) 
        let config = {
            method: 'post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({schedule: schedule, token: localStorage.getItem("token")})
        }
        try {
            return fetch(API_ROOT + "/schedule_events", config)
            .then(response =>
                {
                    if (!response.ok) {
                        alert("Unable to save schedule");
                        return;
                    }
                    else {                          
                      response.json().then(json => {
                        alert('submitted');
                        this.setState({showMySchedule: false, showScheduleEvent: false})
                      });                  
                    }
                });
        }
        catch(err) {
            alert(err);
        }
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
              return fetch(API_ROOT + "/schedule_meta", config)
                .then(response => response.json().then(json => ({json, response})))
                .then(({json, response}) => {
                  if (!response.ok) {
                    throw new Error("Unable to retrieve schedule information")
                  }
                  //console.log(json);
                  this.setState({
                      users: json.users,
                      conferences: json.conferences,
                      questionnaires: json.questionnaires,
                      showScheduleEvent: true
                    })
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
                    conferences={this.state.conferences}
                    questionnaires={this.state.questionnaires}
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