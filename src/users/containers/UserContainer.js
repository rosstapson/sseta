import React, { Component } from 'react';

export default class UserContainer extends Component {
    
    render() {
        alert(this.props.user.role);
        // let role = JSON.parse(this.props.user.role);
        // console.log(role);
        return(
        <div style={{                
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            justifyContent: 'center'            
        }}>
        <h1 className="App-intro">{this.props.user.name}</h1>
        <br/><br/><br/>
        <table>
            <tbody>
                <tr>
                    <td><h4>Email:</h4></td>
                    <td>{this.props.user.email}</td>
                </tr>
                <tr>
                    <td><h4>Telephone:</h4></td>
                    <td>{this.props.user.telephone}</td>
                </tr>
                <tr>
                    <td><h4>Address:</h4></td>
                    <td>{this.props.user.address}</td>
                </tr>
                <tr>
                    <td><h4>State:</h4></td>
                    <td>{this.props.user.state}</td>
                </tr>
                <tr>
                    <td><h4>Country:</h4></td>
                    <td>{this.props.user.country}</td>
                </tr>
                <tr>
                    <td><h4>Company:</h4></td>
                    <td>{this.props.user.company}</td>
                </tr>
                <tr>
                    <td><h4>Division:</h4></td>
                    <td>{this.props.user.division}</td>
                </tr>
                <tr>
                    <td><h4>Roles:</h4></td>
                    <td>{this.props.user.role}</td>
                </tr>
            </tbody>
        </table>
        <button style={{
            padding: '10px',
            backgroundColor: '#62DFF8'
        }}
        onClick={this.props.hideMe}>Back</button>
        </div>
        )
    }
}