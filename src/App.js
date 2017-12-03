import React, { Component } from "react";
import { auth, database, googleAuthProvider, provider } from "./firebase";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Household from './Household';
import Chat from './Chat

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleChange(e) {}

  logout() {
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  }

  login() {
    auth.signInWithPopup(googleAuthProvider).then(result => {
      const user = result.user;
      this.setState({ user });
    });
  }

  logInStuff = () => (
    <div className="app">
      <header>
        <div className="wrapper">
          <h1>Querty Household</h1>
          {this.state.user ? (
            <button onClick={this.logout}>Logout</button>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
        </div>
      </header>
      {this.state.user ? (
        <div>
          <div className="user-profile">
            <img src={this.state.user.photoURL} alt="profile"/>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <p>Login to your Household to continue</p>
        </div>
      )}
    </div>
  )

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className='transparent z-depth-0'>
              <div className="nav-wrapper">
                <a href="/" className="brand-logo"><img src='/logo.png' height='70' alt="friends from hell"/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><Link className="red-text" to="/households/new">new households</Link></li>
                  <li><Link className="red-text" to="/topics">Topics</Link></li>
                </ul>
              </div>
            </nav>
            <Route exact path="/households/new" component={Household}/>
            <Route exact path="/households/qwerty/chat" component={Chat}/>
          </div>
        </Router>
        {this.logInStuff()}
      </div>
    );
  }
}

export default App;
