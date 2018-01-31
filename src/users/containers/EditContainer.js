import React, { Component } from 'react';
import SelectCountry from '../../common/SelectCountry';

export default class EditContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }
    handleChange = (event) => {        
        let user = {...this.state.user};        
        user[event.target.id] = event.target.value;        
        this.setState({ user: user});        
    }
    handleSubmit = () => {
        this.props.handleSubmit(this.state.user);
    }
    render() {
        return (
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
                        <td><input 
                        placeholder="Email" 
                        id="email"
                        defaultValue={this.state.user.email}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Telephone:</h4></td>
                        <td><input 
                        placeholder="Telephone" 
                        id="telephone"
                        defaultValue={this.state.user.telephone}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Address:</h4></td>
                        <td><input 
                        placeholder="Address" 
                        id="address"
                        defaultValue={this.state.user.address}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>State:</h4></td>
                        <td><input 
                        placeholder="State" 
                        id="state"
                        defaultValue={this.state.user.state}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Country:</h4></td>
                        <td><SelectCountry                         
                        id="country"
                        defaultValue={this.state.user.country}
                        handleChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Company:</h4></td>
                        <td><input 
                        placeholder="Company" 
                        id="company"
                        defaultValue={this.state.user.company}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Division:</h4></td>
                        <td><input 
                        placeholder="Division" 
                        id="division"
                        defaultValue={this.state.user.division}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><h4>Roles:</h4></td>
                        <td><input 
                        placeholder="Roles" 
                        id="role"
                        defaultValue={this.state.user.role}
                        onChange={this.handleChange}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.handleSubmit}>Submit</button>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.props.hideMe}>Cancel</button>
            </div>
            </div>
        )
    }
}