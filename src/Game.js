import React from 'react'
import Square from './Square'


export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.squareSize = 10;
    this.state = {
      width: Math.floor(props.width/this.squareSize),
      height: Math.floor(props.height/this.squareSize)
    }
    console.log(this.state.width, this.state.height);
  }
  renderSquare(row, column) {
    <Square row={row} column={column}></Square>
  }
  render() {
    return (
      <div className="board">
        
      </div>
    );
  }
}
