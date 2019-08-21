import React, { Component } from 'react'
import Board from './Board'
import Square from './Square';

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

    jumpTo(step){
      this.setState({
        stepNumber: step,
        xisNext: (step%2)===0
      })
    }

    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1); // gets the last step number
        const current = history[history.length -1]; //shows the last step we took
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);

        //if there is a winner, no one can change positions
        if(winner || squares[i]){
          return;
        };

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
      const winner = calculateWinner(current.squares);
      const moves = history.map((step,move)=>{
        const desc = move ? 'Go to #' + move:'Start the Game';
        return (
          <li key={move}>
            <button onClick={()=>{this.jumpTo(move)}}>
              {desc}
            </button>
          </li>
        )
      });
      let status;
      if(winner){
        status = 'Winner is ' + winner;
      } else{
        status = 'Next Player is ' + (this.state.xisNext?'X':'O');
      }
    return (
      <div className="game">
        <div className="game-board">
             <Board onClick={(i)=>this.handleClick(i)} 
            squares={current.squares} /> 
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    )
  }
}
function calculateWinner(squares){

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  //checks the matrix rows for a winner
  for(let i=0; i<lines.length;i++){
    const [a,b,c] = lines[i];
    
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }

  return null;

}

