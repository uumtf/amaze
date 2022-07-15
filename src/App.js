import React from 'react'

import Header from './Header'
import Board from './Board'


export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header onClick={() => this.content.resetBoard()}></Header>
        <Board ref={instance => {this.content = instance;}}></Board>
      </div>
    );
  }
}

