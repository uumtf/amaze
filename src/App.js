import React from 'react'

import Header from './Header'
import Board from './Board'


export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.boardRef = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <Header onResetClick={() => this.boardRef.current.resetBoard()}
                onGenerateClick={(type) => this.boardRef.current.generateMaze(type)}
                onSolveClick={(type) => this.boardRef.current.solveMaze(type)}></Header>
        <Board ref={this.boardRef}></Board>
      </div>
    );
  }
}

