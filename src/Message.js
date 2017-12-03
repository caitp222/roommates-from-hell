import React, { Component } from 'react';
import './styles/chat.css'

class Message extends Component {
  render() {
    return(
      <div>
        <p>{this.props.message.text}</p>
        <p className="tiny">Sent by: {this.props.message.name}</p>
      </div>
    )
  }
}

export default Message;
