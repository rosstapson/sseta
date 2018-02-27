import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import { API_ROOT } from './config'; 

import {
  BrowserRouter as Router,  
} from 'react-router-dom';

import Login from './auth/containers/Login';
import RegisterWidget from './auth/components/RegisterWidget';
import Home from './Home';
//import jwt from 'jsonwebtoken';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      isLoggedIn: false,
      //isAdmin: isAdmin,
      showLogin: true
    }
  }
  async componentDidMount() {
    let isLoggedIn = await this.checkToken();
    //console.log('componentDidMount: ' + isLoggedIn)
    if (isLoggedIn) {
      this.setState({isLoggedIn});
    }
    else {
      this.handleLogout();
    }
  }
  handleLogin = (user) => {
    let config = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({user: user})
    }
    try {
    return fetch(API_ROOT + "/login", config)
        .then(response =>
            {
                if (!response.ok) {
                    alert("Invalid credentials");
                }
                else {
                  response.json().then(json => {
                    //console.log(json.id)
                    localStorage.setItem("email", json.email);
                    localStorage.setItem("id", json.id);
                    localStorage.setItem("token", json.token);
                    this.setState({showLogin: false, isLoggedIn: true, user: json, user_id: json.id});                   
                  });                  
                }
            })
            .catch(err => {                    
                alert(err)
            }); 
        
    }
    catch(err) {
        alert(err);
    }
  }
  checkToken = async() => {
    let token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    let config = {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({token: token})
    }
    try {
      let response = await fetch(API_ROOT + "/check_token", config);
      if (!response.ok) {
          //alert("Invalid credentials");
          console.log("false")
          return false;
      }
      else {
        console.log("true")
        return "loggedIn";
      }
    }
    catch(err) {
        alert(err);
    }
  }
  handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLearner");
    localStorage.removeItem("isTeacher");
    localStorage.removeItem("isManager");
    localStorage.removeItem("id");
    this.setState({
      isLoggedIn: false,
      showLogin: true
    });
  }
  registerUser = (user) => {
    let config = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({user: user})
  }
  try {
  return fetch(API_ROOT + "/users", config)
      .then(response =>
          { 
            if (!response.ok) {
              alert("Error");
            }
            else {
              this.showLogin();
            }
          });
      
  }
  catch(err) {
      alert(err);
  }
    this.setState({user: user, showLogin: true});
  }
  showLogin = () => {
    let toggle = !this.state.showLogin;
    this.setState({showLogin: toggle});
  }
  render() {
    return (
      <Router>
        <div className="App">        
          <div>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to My Services SETA</h1>
            </header>
        </div>
        {this.state.isLoggedIn &&
          <Home user={this.state.user} handleLogout={this.handleLogout}/>
        }
        {!this.state.isLoggedIn && this.state.showLogin &&
          <div>
            <Login handleLogin={this.handleLogin}/>
            Don't have an account?<br/>
            <button
              style={{
                padding: '10px',
                backgroundColor: '#62DFF8'
              }}
              onClick={this.showLogin}>Sign Up</button>
          </div>
        }
        {!this.state.isLoggedIn && !this.state.showLogin &&
          <div>
            <RegisterWidget registerUser={this.registerUser} />
            Already signed up? <br/>
            <button
              style={{
                padding: '10px',
                backgroundColor: '#62DFF8'
              }}
              onClick={this.showLogin}>Sign In</button>
          </div>
        }
        
        </div>
      </Router>
    );
  }
}

export default App;
