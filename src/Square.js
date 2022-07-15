import React from 'react'
import "./Square.css"

export default class Square extends React.Component {

  shouldComponentUpdate(nextProps) {
    if(this.props.type != nextProps.type) {
      return true;
    }
    return false;
  }
  render() {
    let className = "cell";
    if(this.props.type == 2) 
      className += " start";
    else if(this.props.type == 3)
      className += " end"
    else if(this.props.type == 1)
      className += " wall";
    return (
      <td className = {className} 
          onMouseDown={(e) => this.props.onMouseDown(e, this.props.row, this.props.column)}
          onMouseOver={() => this.props.onMouseOver(this.props.row, this.props.column)}
          onMouseUp={() => this.props.onMouseUp(this.props.row, this.props.column)}>
      </td>      
    );
  }
}

