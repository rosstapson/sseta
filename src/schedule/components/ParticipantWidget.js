import React, { Component } from 'react';

export default class ParticipantWidget extends Component {
    constructor(props) {
        super(props);
        let users = this.props.users;
        let participants = [users[0]]
        users.splice(0, 1);
        this.state = {            
            participants: participants,
            users: users,
            selected: users[0].id,
        }
    }
    handleSelect = (event) => {
        this.setState({selected: event.target.value})
    }
    handleAdd = () => {
        let participants = this.state.participants.slice();
        let users = this.state.users.slice();
        let newAddition = users.filter((user) => {
            return user.id === this.state.selected
        });
        participants.push(newAddition[0]);        
        users = users.filter((user) => {
            return user.id !== this.state.selected
        });
        let selected = -1
        if (users.length > 0) {
            selected = users[0].id
        }
        this.props.handleParticipantsChange(participants);
        this.setState({users: users, participants: participants, selected: selected})        
    }
    handleRemove = (event) => {
        let participants = this.state.participants.slice();
        let users = this.state.users.slice();
        let subtraction = participants.filter(entry => {
            return event.target.id === entry.id
        })
        users.push(subtraction[0]);
        participants = participants.filter(entry => {
            return event.target.id !== entry.id
        });
        this.props.handleParticipantsChange(participants);
        this.setState({users: users, participants: participants, selected: users[0].id})
      }
    render() {
        //console.log(this.state.participants)
        return(
            <table ><tbody>
            {this.state.participants.map(entry => {
                return <tr key={entry.id}>
                <td>{entry.email}</td>
                <td><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    id={entry.id} 
                    onClick={this.handleRemove}>Remove</button></td>
                </tr>
            })
            }
            {this.state.users.length > 0 &&
            <tr><td>
                <select 
                    onChange={this.handleSelect}
                    defaultValue={this.state.selected}
                >
                    {this.state.users.map(entry => {
                        return <option key={entry.id} value={entry.id}>
                        {entry.email}                       
                        </option>
                    })
                    }
                </select>
                </td>
                <td><button  style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}                
                    onClick={this.handleAdd}>Add</button></td>
            </tr>
            }
            </tbody></table>
        )
    }
}