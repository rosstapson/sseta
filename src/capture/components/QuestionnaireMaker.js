import React, { Component } from 'react';
import cuid from 'cuid';
//import cuid from 'cuid';

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
  moveDown = (event) => {    
    let entries = this.state.formEntries.slice();    
    for (let i = 0; i < entries.length; i++) {      
      if (entries[i].id === event.target.id) {
        if (i < entries.length - 1) {
          let temp = entries[i + 1];
          entries[i + 1] = entries[i];
          entries[i] = temp;
          this.setState({formEntries: entries});
          break;
        }
      }
    }
  }
  moveUp = (event) => {    
    let entries = this.state.formEntries.slice();    
    for (let i = 0; i < entries.length; i++) {      
      if (entries[i].id === event.target.id) {
        if (i > 0) {
          let temp = entries[i - 1];
          entries[i - 1] = entries[i];
          entries[i] = temp;
          this.setState({formEntries: entries});
          break;
        }
      }
    }
  }
  handleSave = () => {
    if (this.state.formEntries.length === 0) {
      alert("Empty Questionnaire");
      return;
    }
    let questionnaire = {
      name: this.state.formTitle,
      entries: this.state.formEntries
    }    
    this.props.saveQuestionnaire(questionnaire); 
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
              return <tr key={cuid()}>
                <td>{entry.question}</td>
                <td>{entry.answerType}</td>
                <td><button style={{
                  padding: '10px',
                  backgroundColor: '#62DFF8'}}
                  id={entry.id} 
                  onClick={this.moveUp}>&#x25B2;</button></td>
                  <td><button style={{
                    padding: '10px',
                    backgroundColor: '#62DFF8'}}
                    id={entry.id} 
                    onClick={this.moveDown}>&#x25BC;</button></td>
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

