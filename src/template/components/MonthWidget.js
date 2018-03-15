import React, { Component } from 'react';

export default class MonthWidget extends Component {
    handleAdd = () => {
        alert("handleAdd")
    }
    render() {
        return(
            <tr><td> {this.props.month.month} </td>
            <td>
                <button onClick={this.handleAdd}>Add an event</button>
            </td>
            </tr>
        )
    }
        
    
}