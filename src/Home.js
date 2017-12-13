import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            questionnairePending: true
        }
    }
    render() {
        return(
            <div>
            <h1 className="App-intro">Welcome back, {}</h1>
            </div>
        )
    }
}