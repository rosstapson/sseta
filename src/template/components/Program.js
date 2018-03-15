import React, { Component } from 'react';

import MonthWidget from './MonthWidget';

export default class Program extends Component {
    constructor(props) {
        super(props);
        let program = this.props.program;
        let grid = [];
        for (let i = 0; i < 12; i++) {
            let gridEntry = {month: i + 1, entries: []};
            program.forEach(entry => {
                if (entry.month === i + 1) {
                    gridEntry.entries.push(entry);
                }
            });
            grid.push(gridEntry);
        }
        this.state = {
            program: program,
            grid: grid
        }
    }
    render() {
        return(
            <div><table><tbody>
                {
                    this.state.grid.map(entry => {                        
                        return(
                            <MonthWidget 
                                key={entry.month}
                                month={entry}
                            />
                        )
                    })
                }
            </tbody></table></div>
        )
    }
}