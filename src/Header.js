
import React from 'react'

import  './Header.css'

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      generationType: "recursive"
    }
  }
  
  generateClick(type) {
    this.setState({
      generationType: type
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
        <button onClick={() => this.props.onGenerateClick(this.state.generationType)}>GenerateMaze</button>
      </div>
    );
  }
}

