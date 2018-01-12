import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';

import {
  BrowserRouter as Router,  
} from 'react-router-dom';

import Login from './auth/containers/Login';
import RegisterWidget from './auth/components/RegisterWidget';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    let isLoggedIn = localStorage.getItem("token");
    let isAdmin = false;
    if (isLoggedIn === "isAdmin") {
      isAdmin = true;
    }
    this.state = {
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      showLogin: true
    }
  }
  
  registerUser = (user) => {
    localStorage.setItem("username", user.username);
    localStorage.setItem("password", user.password);
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
          <Home user={this.state.user}/>
        }
        {!this.state.isLoggedIn && this.state.showLogin &&
          <div>
            <Login />
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
