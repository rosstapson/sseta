import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';
import Program from '../components/Program';

export default class MyTemplates extends Component {
  constructor(props) {
    super(props);
    let program = this.props.program;
    let learnerProgram = [];
    let leadEmployerProgram = [];
    let hostEmployerProgram = [];
    let sdpProgram = [];
    program.forEach(entry => {
      console.log(entry)
      switch(entry.category) {
        case "Learner":
          learnerProgram.push(entry);
          break;
        case "Lead Employer":
          leadEmployerProgram.push(entry);
          break;
        case "Host Employer":
          hostEmployerProgram.push(entry);
          break;
        case "SDP":
          sdpProgram.push(entry);
          break;
        default: 
          break;
      }
    });
    this.state = {
      questionnaires:this.props.questionnaires,
      program: this.props.program,
      learnerProgram: learnerProgram,
      leadEmployerProgram: leadEmployerProgram,
      hostEmployerProgram: hostEmployerProgram,
      sdpProgram: sdpProgram
    }
  }
  render() {
    return(
      <div><h1 className="App-intro">Program Templates</h1>
        <Tabs>
        <TabList>
          <Tab>Learner</Tab>
          <Tab>Lead Employer</Tab>
          <Tab>Host Employer</Tab>
          <Tab>SDP</Tab>
        </TabList>
        <TabPanel>
          <h2><Program 
            category={"Learner"}
            program={this.state.learnerProgram}
            questionnaires={this.state.questionnaires} 
            handleAdd={this.props.handleAdd}
          /></h2>          
        </TabPanel>
        <TabPanel>
          <h2><Program 
            category={"Lead Employer"} 
            program={this.state.leadEmployerProgram} 
            questionnaires={this.state.questionnaires}
            handleAdd={this.props.handleAdd}
            /></h2>
        </TabPanel>
        <TabPanel>
          <h2><Program 
            category={"Host Employer"} 
            program={this.state.hostEmployerProgram} 
            questionnaires={this.state.questionnaires}
            handleAdd={this.props.handleAdd}
            /></h2>
        </TabPanel>
        <TabPanel>
        <h2><Program 
          category={"SDP"} 
          program={this.state.sdpProgram} 
          questionnaires={this.state.questionnaires}
          handleAdd={this.props.handleAdd}
          /></h2>
      </TabPanel>
    </Tabs>
    <button style={{
        padding: '10px',
        backgroundColor: '#62DFF8'
    }}
    onClick={this.props.handleCancel}>Cancel</button>
    </div>
    )
  }
}