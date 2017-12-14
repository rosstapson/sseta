import React, { Component } from 'react';

import AnswerWidget from './AnswerWidget';
//do this by hand for now, but there'll need to be a Question object that'll take arguments
// like 'multiple-chose' versus 'text' 
export default class QuestWidget extends Component {
    render() {
        return(
            <div style={{                
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
            <table>
                <tbody>
                    <tr>
                        <td>
                        1. I was inducted into the program
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="1"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        2. This program is in line with what was explained to me before I signed up
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="2"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        3. I know what my allotted
                        stipend amount is.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        3a. Stipend allocation                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget type="text" id="4"/>
                        </td>
                    </tr>                    
                    <tr>
                        <td>
                        4. I understand that my stipend will be lower if I miss classes or work
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="5"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        5. My employer has explained the workplace policies & procedures
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="6"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        6. I understand what an assessment is
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="7"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        7. My work place environment is good (e.g. lighting, ventilation, bathroom facilities, etc)
                        
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <AnswerWidget id="8"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}
