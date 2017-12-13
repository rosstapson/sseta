import React, {Component} from 'react';

export default class  LoginWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: ""
            }
        }
    }
    handleChange = (event) => {
        let user = {...this.state.user};        
        user[event.target.id] = event.target.value;        
        this.setState({ user });        
      }
    loginUser = () => {      
        this.props.loginUser(this.state.user);
    }
    render() {
        return (
            <div>
                <h1 className="App-intro">Sign In</h1>
                <input 
                    placeholder="Username" 
                    id="username"
                    onChange={this.handleChange}
                    />
                <input 
                    type="password" 
                    placeholder="Username" 
                    id="password"
                    onChange={this.handleChange}
                    />
                <button 
                    type="button" 
                    onClick={this.loginUser
                    }>Submit</button>
            </div>
        )
    }
}