import React from 'react'
import Square from './Square'

import './Board.css'

import {fill_matrix, array_equals} from './Utils.js'

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.squareSize = 30;
    const columns = Math.floor(window.innerWidth/this.squareSize);
    const rows = Math.floor((window.innerHeight-50)/this.squareSize);
    this.state = {
      columns: columns, 
      rows: rows,
      startPoint: [0, 0],
      endPoint: [rows-1, columns-1],
      board: fill_matrix(rows, columns, 0),
      mouseIsDown: undefined
    }
    
    this.state.board[this.state.startPoint[0]][this.state.startPoint[1]] = 2;
    this.state.board[this.state.endPoint[0]][this.state.endPoint[1]] = 3;

    this.handleDraw = this.handleDraw.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.renderSquare = this.renderSquare.bind(this);
    this.resetBoard = this.resetBoard.bind(this);

  }

  renderSquare(row, column) {
    let key = row+"-"+column;
    let start = row == this.state.startPoint[0] && column == this.state.startPoint[1] ? true : undefined;
    let end = row == this.state.endPoint[0] && column == this.state.endPoint[1] ? true : undefined;
    return (
      <Square 
          onMouseOver={this.handleDraw} 
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          type={this.state.board[row][column]} 
          row={row} column={column} 
          start={start} end={end}
          key={key}>
      </Square>
    );
  }

  setNewStartPoint(row, column) {
    let new_board = this.state.board;
    new_board[this.state.startPoint[0]][this.state.startPoint[1]] = 0;
    new_board[row][column] = 2;
    this.setState({
      board: new_board,
      startPoint: [row, column]
    });
  }

  setNewEndPoint(row, column) {
    let new_board = this.state.board;
    new_board[this.state.endPoint[0]][this.state.endPoint[1]] = 0;
    new_board[row][column] = 3;
    this.setState({
      board: new_board,
      endPoint: [row, column]
    });
  }

  resetBoard() {
    console.log("reset");
    const new_columns = Math.floor(window.innerWidth/this.squareSize);
    const new_rows = Math.floor((window.innerHeight-50)/this.squareSize);
    let new_board = fill_matrix(new_rows, new_columns, 0);
    new_board[0][0] = 2;
    new_board[new_rows-1][new_columns-1] = 3;
    this.setState({
      columns: new_columns,
      rows: new_rows,
      board: new_board,
      startPoint: [0, 0],
      endPoint: [new_rows-1, new_columns-1],
      mouseIsDown: undefined
    });
  }

  componentDidMount() {
    ["resize", "fullscreenchange"].forEach(e => window.addEventListener(e, this.resetBoard));
  }
  
  mouseDown(e, row, column) {
    e.preventDefault();
    if(array_equals([row, column], this.state.startPoint)) {
      console.log("start");
      this.setState({
        mouseIsDown: "start"
      });
      return;
    }
    if(array_equals([row, column], this.state.endPoint)) {
      console.log("end");
      this.setState({
        mouseIsDown: "end" 
      });
      return;
    }
    let new_board = this.state.board;
    if(this.state.board[row][column] == 0)
      new_board[row][column] = 1;
    else
      new_board[row][column] = 0;
    this.setState({
      board: new_board,
      mouseIsDown: "default"
    });
  }

  mouseUp(row, column) {
    if(this.state.mouseIsDown == "start" && !array_equals([row, column], this.state.endPoint)) {
      this.setNewStartPoint(row, column); 
    }
    if(this.state.mouseIsDown == "end" && !array_equals([row, column], this.state.startPoint)) {
      this.setNewEndPoint(row, column);
    }
    this.setState({
      mouseIsDown: undefined,
    });
  }

  handleDraw(row, column) {
    if(array_equals([row, column], this.state.startPoint) ||
        array_equals([row, column], this.state.endPoint)) {
      return;
    }
    if(this.state.mouseIsDown == "default") {
      let new_board = this.state.board;
      if(this.state.board[row][column] == 0)
        new_board[row][column] = 1;
      else
        new_board[row][column] = 0;
      this.setState({
        mouseIsDown: "default",
        board: new_board
      });
    }
  }

  render() {
    let rows = [];
    for(let row=0; row<this.state.rows; row++) {
      let cells = [];
      for(let column=0; column<this.state.columns; column++) {
        cells.push(
          this.renderSquare(row, column)
        )
      }
      rows.push(
        <tr key={row}>{cells}</tr>
      );
    }

    return (
      <div className="board-container">
        <table className="board">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
