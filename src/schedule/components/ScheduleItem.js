import React, { Component } from 'react';

export default class ScheduleItem extends Component {
    render() {
        return (
            <tr>   
                <td>{this.props.eventType}</td>
                <td>{this.props.dateTime}</td>
                <td>{this.props.status}</td>
            </tr>
        )
    }
}