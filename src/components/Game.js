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
        squares[i] = this.state.xisNext?'X':'O'; //check who is next playing
        this.setState({
          history: history.concat({
            squares: squares
          }), //tracks the players turns

        xisNext: !this.state.xisNext,
        stepNumber: history.length
        });
        
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
