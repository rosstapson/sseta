import React, { Component } from 'react';

export default class UserListItem extends Component {
    view = () => {
        this.props.view(this.props.user.id);
    }
    
    render() {        
        return(
            <tr>            
            <td>{this.props.user.name}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.company}</td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.view}>View</button></td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}>Edit</button></td>
            <td><button style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}>Delete</button></td> 
            </tr>
        )
    }
}