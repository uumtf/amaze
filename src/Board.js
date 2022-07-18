import React from 'react'
import Square from './Square'

import './Board.css'

import {fill_matrix, array_equals} from './Utils.js'

import {generate} from './algos/GenerateMaze.js'

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.squareSize = 35;
    const columns = Math.floor(window.innerWidth/this.squareSize);
    const rows = Math.floor((window.innerHeight-60)/this.squareSize);
    this.state = {
      columns: columns, 
      rows: rows,
      startPoint: [0, 0],
      endPoint: [rows-1, columns-1],
      board: fill_matrix(rows, columns, 0),
      mouseIsDown: undefined,
    }
    
    this.draw = false;
    this.state.board[this.state.startPoint[0]][this.state.startPoint[1]] = 2;
    this.state.board[this.state.endPoint[0]][this.state.endPoint[1]] = 3;

    this.handleDraw = this.handleDraw.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);

    this.renderSquare = this.renderSquare.bind(this);
    this.resetBoard = this.resetBoard.bind(this);

    this.generateMaze = this.generateMaze.bind(this);

  }

  sleep() {
    return new Promise(resolve => setTimeout(resolve, 16));
  }

  async generateMaze(type) {
    if(this.draw == true) {
      return;
    }
    let blockValue = 1, fillValue = 0;
    if(type == "backtracking") {
      blockValue = 0;
      fillValue = 1;
    }
    await this.resetBoard(fillValue, this.state.startPoint, this.state.endPoint);
    let blocks = [];
    blocks = generate(type, this.state.startPoint, this.state.endPoint, this.state.board, this.state.rows, this.state.columns);
    await this.resetBoard(fillValue, this.state.startPoint, this.state.endPoint);
    this.draw = true;
    for(let index in blocks) {
      if(this.draw == false) {
        this.resetBoard();
        break;
      }
      this.state.board[blocks[index][0]][blocks[index][1]] = blockValue;
      if(index % 2 == 0) {
        this.setState({
          board: this.state.board,
        });
        await this.sleep();
      }
    }
    this.setState({
        board: this.state.board
    });
    this.draw = false;
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
    this.state.board = this.state.board;
    for(let i = 0; i < this.state.rows; i++)
      for(let j = 0; j < this.state.columns; j++)
        if(this.state.board[i][j] == 2)
          this.state.board[i][j] = 0;
    this.state.board[row][column] = 2;
    this.setState({
      board: this.state.board,
      startPoint: [row, column]
    });
  }

  setNewEndPoint(row, column) {
    this.state.board = this.state.board;
    for(let i = 0; i < this.state.rows; i++)
      for(let j = 0; j < this.state.columns; j++)
        if(this.state.board[i][j] == 3)
          this.state.board[i][j] = 0;
    this.state.board[row][column] = 3;
    this.setState({
      board: this.state.board,
      endPoint: [row, column]
    });
  }

  async resetBoard(value = 0, startPoint, endPoint) {
    this.draw = false;
    const new_columns = Math.floor(window.innerWidth/this.squareSize);
    const new_rows = Math.floor((window.innerHeight-60)/this.squareSize);
    this.state.board = fill_matrix(new_rows, new_columns, value);

    if(startPoint == undefined)
      startPoint = [0, 0]
    this.state.board[startPoint[0]][startPoint[1]] = 2;

    if(endPoint == undefined)
      endPoint = [new_rows-1, new_columns-1]
    this.state.board[endPoint[0]][endPoint[1]] = 3;

    this.setState({
      columns: new_columns,
      rows: new_rows,
      board: this.state.board,
      startPoint: startPoint,
      endPoint: endPoint,
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
    this.state.board = this.state.board;
    if(this.state.board[row][column] == 0)
      this.state.board[row][column] = 1;
    else
      this.state.board[row][column] = 0;
    this.setState({
      board: this.state.board,
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
      mouseIsDown: undefined
    });
  }

  handleDraw(row, column) {
    if(array_equals([row, column], this.state.startPoint) ||
        array_equals([row, column], this.state.endPoint)) {
      return;
    }
    if(this.state.mouseIsDown == "default") {
      this.state.board = this.state.board;
      if(this.state.board[row][column] == 0)
        this.state.board[row][column] = 1;
      else
        this.state.board[row][column] = 0;
      this.setState({
        board: this.state.board
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
