import React, { Component } from "react";
import { auth, database, googleAuthProvider, provider } from "./firebase";
import { BrowserRouter } from "react-router-dom";
import "./App.css";


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

  render() {
    return (
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
              <img src={this.state.user.photoURL} />
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <p>Login to your Household to continue</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
