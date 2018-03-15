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
      switch(entry.category) {
        case "learner":
          learnerProgram.push(entry);
          break;
        case "lead employer":
          leadEmployerProgram.push(entry);
          break;
        case "host employer":
          hostEmployerProgram.push(entry);
          break;
        case "sdp":
          sdpProgram.push(entry);
          break;
        default: 
          break;
      }
    });
    this.state = {
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
          /></h2>          
        </TabPanel>
        <TabPanel>
          <h2><Program category={"Lead Employer"} /></h2>
        </TabPanel>
        <TabPanel>
          <h2><Program category={"Host Employer"} /></h2>
        </TabPanel>
        <TabPanel>
        <h2><Program category={"SDP"} /></h2>
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