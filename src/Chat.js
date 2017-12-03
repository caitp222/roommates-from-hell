import React, { Component } from 'react';
import './styles/chat.css'
import {
  fire,
  database,
  auth,
  storage,
  googleAuthProvider
} from './firebase.js'
import Message from './Message'

class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      newMessageText: ""
    }
    this.handleMessageChange = this.handleMessageChange.bind(this)
    this.saveMessage = this.saveMessage.bind(this)
  }

  componentDidMount = function() {
    const messagesRef = database.ref('chats/qwerty/messages')
    messagesRef.on('value', (snapshot) => {
      const messages = Object.values(snapshot.val())
      this.setState ({messages: messages})
    })
  //   const setMessage = function(data) {
  //   const val = data.val();
  //   this.displayMessage(data.key, val.name, val.text, val.photoUrl, val.imageUrl);
  // }.bind(this);
  }

  handleMessageChange = function(event) {
    this.setState({ newMessageText: event.target.value })
  }

  saveMessage = function(event) {
    event.preventDefault()
    // const currentUser = googleAuthProvider.currentUser
    const messageText = this.state.newMessageText
    const messagesRef = database.ref('/chats/qwerty/messages')
    messagesRef.push({
      name: fire.auth().currentUser.displayName,
      text: messageText
    }).then(() => {
      this.setState({ newMessageText: "" })
    })
  }

  render() {
    return(
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
          <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
            <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
              <h3><i className="material-icons">chat_bubble_outline</i> Friendly Chat</h3>
            </div>
            <div id="user-container">
              <div hidden id="user-pic"></div>
              <div hidden id="user-name"></div>
              <button hidden id="sign-out" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
                Sign-out
              </button>
              <button hidden id="sign-in" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white">
                <i className="material-icons">account_circle</i>Sign-in with Google
              </button>
            </div>
          </div>
        </header>
        <main className="mdl-layout__content mdl-color--grey-100">
          <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">
            <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
              <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                <div id="messages">
                  <span id="message-filler"></span>
                  { this.state.messages.map( function(message) {
                    return <Message message={message} />
                  }) }
                </div>
                <form id="message-form" action="#">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input" type="text" id="message" value={ this.state.newMessageText } onChange={ this.handleMessageChange }/>
                    <label className="mdl-textfield__label" for="message">Message...</label>
                  </div>
                  <button id="submit" type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onClick={ this.saveMessage }>
                    Send
                  </button>
                </form>
                <form id="image-form" action="#">
                  <input id="mediaCapture" type="file" accept="image/*,capture=camera" />
                  <button id="submitImage" title="Add an image" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
                    <i className="material-icons">image</i>
                  </button>
                </form>
              </div>
            </div>
            <div id="must-signin-snackbar" className="mdl-js-snackbar mdl-snackbar">
              <div className="mdl-snackbar__text"></div>
              <button className="mdl-snackbar__action" type="button"></button>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default ChatBox;
