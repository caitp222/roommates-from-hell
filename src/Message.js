import React, { Component } from 'react';

class Message extends Component {
  render() {
    return(
      <div>
        <p>{this.props.message.text}</p>
        <p>{this.props.message.name}</p>
      </div>
    )
  }
}

export default Message;
