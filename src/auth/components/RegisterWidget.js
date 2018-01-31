import React, { Component } from 'react';
import SelectCountry from '../../common/SelectCountry';
import '../../App.css';

export default class RegisterWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                confirmPassword:"",
                company: "",
                role: "",
                telephone: "",
                division: "",
                address: "",
                state: "",
                country: "",

            },            
            passwordValid: true
        }
    }
    validatePassword = (event) => {
        let password = event.target.value;
        let valid = true;
        if (password !== this.state.user.confirmPassword) {
            valid = false;
        }
        let user = {...this.state.user};
        user.password = password;
        this.setState({ user: user, passwordValid: valid})
    }
    validateConfirmPassword = (event) => {
        let confirmPassword = event.target.value;
        let valid = true;
        if (confirmPassword !== this.state.user.password) {
            valid = false;
        }
        let user = {...this.state.user};
        user.confirmPassword = confirmPassword;
        this.setState({ user: user, passwordValid: valid})
    }
        handleChange = (event) => {        
            let user = {...this.state.user};        
            user[event.target.id] = event.target.value;        
            this.setState({ user: user});        
        }
    registerUser = () => {        
        if (!this.state.passwordValid) {
            alert("Passwords Don't Match")
            return;
        }
        this.props.registerUser(this.state.user);
    }
    render() {
        return (
            <div>
            <h1 className="App-intro">Sign Up</h1>
                <div style={{          
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                <table  className="table" style={{}}><tbody>
                <tr>
                        <td>Name</td>
                        <td>
                            <input 
                                placeholder="Name" 
                                id="name"
                                onChange={this.handleChange}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td>Email address</td>
                        <td>
                            <input 
                                placeholder="Email" 
                                id="email"
                                onChange={this.handleChange}
                                />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                        <input 
                            type="password"                              
                            id="password"
                            placeholder="Password" 
                            onChange={this.validatePassword}
                            />
                            {!this.state.passwordValid &&
                                <div>X</div>
                            }
                        </td>
                    </tr>
                    <tr>
                    <td>Confirm Password</td>
                    <td>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        placeholder="Confirm Password" 
                        onChange={this.validateConfirmPassword}
                        />
                        {!this.state.passwordValid &&
                            <div>X</div>
                        }
                    </td>                    
                </tr>
                <tr>
                    <td>Company</td>
                    <td>
                        <input 
                            placeholder="Company" 
                            id="company"
                            onChange={this.handleChange}
                            />
                    </td>
                </tr>
                <tr>
                    <td>Job Title/Role</td>
                    <td>
                        <input 
                            placeholder="Job Title" 
                            id="role"
                            onChange={this.handleChange}
                            />
                    </td>
                </tr>
                <tr>
                <td>Telephone</td>
                <td>
                    <input 
                        placeholder="Telephone" 
                        id="telephone"
                        onChange={this.handleChange}
                        />
                </td>
            </tr>
            <tr>
            <td>Division</td>
                <td>
                    <input 
                        placeholder="Division" 
                        id="division"
                        onChange={this.handleChange}
                        />
                </td>
            </tr>
            <tr>
            <td>Address</td>
                <td>
                    <input 
                        placeholder="Address" 
                        id="address"
                        onChange={this.handleChange}
                        />
                </td>
            </tr>
            <tr>
            <td>State</td>
                <td>
                    <input 
                        placeholder="State" 
                        id="state"
                        onChange={this.handleChange}
                        />
                </td>
            </tr>
            <tr>
                <td>Country</td>
                <td>
                    <SelectCountry
                        id="country"            
                        handleChange={this.handleChange}
                    />
                </td>
            </tr>  
                    </tbody></table>                    
                </div><br/><br/>
                <button 
                type="button"
                style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'
                }}
                onClick={this.registerUser}>Submit</button><br/><br/>
            </div>
        )
    }
}