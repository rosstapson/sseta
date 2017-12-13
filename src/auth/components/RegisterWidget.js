import React, { Component } from 'react';

export default class RegisterWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                confirmPassword:"",
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
                        <td>Email address</td>
                        <td>
                            <input 
                                placeholder="Email" 
                                id="username"
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
                        onChange={this.validateConfirmPassword}
                        />
                        {!this.state.passwordValid &&
                            <div>X</div>
                        }
                    </td>                    
                </tr>
                           
                    </tbody></table>                    
                </div>
                <button 
                type="button" 
                onClick={this.registerUser}>Submit</button>
            </div>
        )
    }
}