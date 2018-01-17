import React, { Component } from 'react';
import { API_ROOT } from '../../config'; 

import LoginWidget from '../components/LoginWidget';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true,
            showSuccess: false,
            showError: false
        }
    }
    
    seeAllUsers = () => {           
        let config = {
            method: 'get',
            headers: {
                'content-type': 'application/json'                  
            }
        }
        try {
        return fetch(API_ROOT + "/users", config)
        .then(response =>
            { 
                if (!response.ok) {
                    alert("Unable to fetch users");
                }
                else {
                  response.json().then(json => {
                    console.log(json);
                  });                  
                }
            });                  
        }
        catch(err) {
            alert(err);
        }
    }
    render() {
        return (
            <LoginWidget loginUser={this.props.handleLogin} seeAllUsers={this.seeAllUsers}/>
        )
    }
}