import React, { Component } from 'react'
import Board from './Board'

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            xisNext: true, //x is always the first player
            stepNumber: 0, //the game starts with 0 steps
            history:[
                {squares: Array(9).fill(null)} //the last square of the board is always empty
            ]
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1); // gets the last step number
        const current = history[history.length -1]; //shows the last step we took
        const squares = current.squares.slice();
    }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
    return (
      <div className="game">
        <div className="game-board">
             <Board onClick={(i)=>this.handleClick(i)} 
            squares={current.squares} /> 
        </div>
      </div>
    )
  }
}
