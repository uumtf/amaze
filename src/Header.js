
import React from 'react'

import  './Header.css'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      generationType: "recursive",
      solveType: "bfs"
    }
  }
  
  generateClick(type) {
    this.setState({
      generationType: type
    });
  }

  solveClick(type) {
    this.setState({
      solveType: type 
    });
  }
  render() {
    return (
      <div className="header-container">
        <button onClick={this.props.onResetClick}>Reset Board</button>
        <select className="generation-type"
                onChange={(e) => this.generateClick(e.target.value)}>
          <option value="recursive">Recursive</option>
          <option value="backtracking">Backtracking</option>
          <option value="kruskal">Kruskal</option>
          <option value="prim">Prim</option>
        </select>
        <button onClick={() => this.props.onGenerateClick(this.state.generationType)}>Generate maze</button>
        <select className="solve-type"
                onChange={(e) => this.solveClick(e.target.value)}>
          <option value="bfs">BFS</option>
          <option value="astar">A*</option>
          <option value="greedy">Greedy</option>
        </select>
        <button onClick={() => this.props.onSolveClick(this.state.solveType)}>Solve maze</button>
      </div>
    );
  }
}

