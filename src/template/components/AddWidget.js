import React, { Component } from "react";

export default class AddWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionnaires: this.props.questionnaires,
            selected: this.props.questionnaires[0].id
        }
    }
    handleChange = (event) => {
        this.setState({ selected: event.target.value })
    }
    handleAdd = () => {        
        this.props.handleAdd(this.state.selected);
    }
    render() {
        return(
            <div>
                <h1 className="App-intro">Add Questionnaire: {this.props.category}</h1>
                <select 
                  id='questionnaire'
                  onChange={this.handleChange}
                  defaultValue={this.state.questionnaires[0].id}
                >
                {
                  this.state.questionnaires.map(q => 
                      <option                         
                        key={q.id}
                        value={q.id}
                      >{q.name}</option>
                  )
                }
                </select>
                <button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    onClick={this.handleAdd}
                    >Add</button>
                <button 
                    style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}} 
                    onClick={this.props.handleCancel}>Cancel</button>
            </div>
        )
    }
}