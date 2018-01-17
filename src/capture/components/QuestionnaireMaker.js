import React, { Component } from 'react';
import cuid from 'cuid';

export default class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formTitle: '',
        formEntries:[],
        entry: {}
    }
  }
  handleTitleChange = (event) => {
    this.setState({ formTitle: event.target.value})
  }
  handleChange = (event) => {
    let entry = {...this.state.entry};
    entry[event.target.id] = event.target.value;        
    this.setState({ entry: entry}); 
  }
  handleAdd = () => {    
    if (this.state.entry && this.state.entry.question !== '') {
      let entry = this.state.entry;
      let entries = this.state.formEntries.slice();
      if (!entry.answerType || entry.answerType === '') {
        entry.answerType = 'Scale of 1 to 5';
      }
      entry.id = cuid();
      entries.push(entry);
      this.refs.id.value = '';
      this.refs.answerType.value = 'Scale of 1 to 5';
      this.setState({formEntries: entries, entry: ''});
    }
  }
  handleRemove = (event) => {    
    this.setState({formEntries: this.state.formEntries.filter(entry => entry.id !== event.target.id)});
    //this.setState({items: this.state.items.filter(item => item.news_id == id )
  }
  handleSave = () => {
      alert("Saving " + this.state.formTitle);
      console.log(this.state.formTitle);
      console.log(this.state.formEntries);
  }
  handleCancel = () => {
     
    let sure = window.confirm("Are you sure? Any data you've entered will be lost.");
     if (sure === true) {
         this.props.handleCancel();
     }
  }
  render() {
    return (      
        <div>
            <div><h3>Questionnaire title/reference:<input type='text' id='title'onChange={this.handleTitleChange}/></h3></div>
          <table style={{width: '80%'}}><tbody>
            <tr>
              <th>Question:</th>
              <th>Answer type:</th>
              <th></th>
            </tr>
            {this.state.formEntries.map(entry => {
              return <tr key={entry.id}>
                <td>{entry.question}</td>
                <td>{entry.answerType}</td>
                <td><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    id={entry.id} 
                    onClick={this.handleRemove}>Remove</button></td>
              </tr>
            })
            }
            <tr>
              <td><input ref = 'id' type='text' defaultValue={this.state.entry.question} id='question' onChange={this.handleChange}/></td>
              <td> 
                <select 
                  id='answerType'
                  ref='answerType'
                  defaultValue='Scale of 1 to 5'
                  onChange={this.handleChange}
                >
                  <option value="Scale of 1 to 5">Scale of 1 to 5</option>
                  <option value="Text">Text</option>
                </select>
              </td>
              <td><button  style={{
                padding: '10px',
                backgroundColor: '#62DFF8'}}
                onClick={this.handleAdd}>Add</button></td>
            </tr>            
          </tbody></table>
          <button  style={{
            padding: '10px',
            backgroundColor: '#62DFF8'}}
            onClick={this.handleSave}>Save Questionnaire</button>
          <button
          style={{
            padding: '10px',
            backgroundColor: '#62DFF8'}}
             onClick={this.handleCancel}>Cancel</button>
        </div>     
    );
  }
}

