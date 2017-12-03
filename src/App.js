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

  houseHoldWithUser = (props) => (
    <Household
      user={this.state.user}
      {...props}
      />
  )
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
      <div>
        <Router>
          <div>
            <nav className='transparent z-depth-0'>
              <div className="nav-wrapper">
                <a href="/" className="brand-logo"><img src='/logo.png' height='70' alt="friends from hell"/></a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {this.state.user ? (
                    <li><a className="red-text" onClick={this.logout}>Logout</a></li>
                  ) : (
                    <li><a className="red-text" onClick={this.login}>Log In</a></li>
                  )}
                  <li><Link className="red-text" to="/households/new">new households</Link></li>
                  <li><Link className="red-text" to="/topics">Topics</Link></li>
                  <li><Link to="/households/1/tasks">{this.state.user ? (<img src={this.state.user.photoURL} style={{marginTop: '15px', marginRight: '10px', borderRadius: '50%'}} alt="profile" width='30' height='30'/>) : null}</Link></li>
                </ul>
              </div>
            </nav>
            <switch>
              <Route exact path="/households/new" component={this.houseHoldWithUser}/>
            </switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
