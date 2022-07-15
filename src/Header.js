
import React from 'react'

import  './Header.css'

export default class Header extends React.Component {

  render() {
    return (
      <div className="header-container">
        <button onClick={this.props.onClick}>Reset Board</button>
      </div>
    );
  }
}

