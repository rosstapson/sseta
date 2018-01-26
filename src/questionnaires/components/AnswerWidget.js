import React, { Component } from 'react';

import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';


export default class AnswerWidget extends Component {    
    
    render() {
        if (this.props.type === "Text") {
            return(
                <div style={{paddingBottom: '40px'}}><input type="text" onChange={this.props.handleAnswer} /></div>
            )
        }
        else 
            return(
                <div  style={{                
                    display: 'flex',
                    flex: '1',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: '40px' 
                }}>
                    <label>
                        <input 
                            type="radio" value="1" 
                            checked={this.props.answer === '1'} 
                            onChange={this.props.handleAnswer} /><br/>
                            <img src={img1} alt="Very Unhappy" height="40" width="40" />
                    </label>
                
                    <label>
                        <input 
                            type="radio" value="2" 
                            checked={this.props.answer === '2'} 
                            onChange={this.props.handleAnswer} /><br/>
                            <img src={img2} alt="Unhappy" height="40" width="40" />
                    </label>
                
                    <label>
                        <input 
                            type="radio" value="3" 
                            checked={this.props.answer === '3'}  
                            onChange={this.props.handleAnswer} /><br/>
                            <img src={img3} alt="Neutral" height="40" width="40" />
                    </label>
                
                    <label>
                        <input 
                            type="radio" value="4" 
                            checked={this.props.answer === '4'}  
                            onChange={this.props.handleAnswer} /><br/>
                            <img src={img4} alt="Happy" height="40" width="40" />
                    </label>
                
                    <label>
                        <input 
                            type="radio" value="5" 
                            checked={this.props.answer === '5'} 
                            onChange={this.props.handleAnswer} /><br/>
                            <img src={img5} alt="Very Happy" height="40" width="40" />
                    </label>
                                
                </div>
            )
    }
}