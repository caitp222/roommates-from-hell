import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Nav = () => (
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">Roommates from hell</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
    </div>
  </nav>
)

const RouterComponent = () => (
  <Router>
    <div>
      <Nav/>

      <Route exact path="/" component={App}/>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();ReactDOM.render(
    <RouterComponent />,
  document.getElementById('root')
);

registerServiceWorker();
