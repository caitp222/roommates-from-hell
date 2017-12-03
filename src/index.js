import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Household from './Household';

import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Nav = () => (
  <nav className='transparent z-depth-0'>
    <div className="nav-wrapper">
      <a href="/" className="brand-logo"><img src='/logo.png' height='70'/></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link className="red-text" to="/">Home</Link></li>
        <li><Link className="red-text" to="/households/new">new households</Link></li>
        <li><Link className="red-text" to="/topics">Topics</Link></li>
      </ul>
    </div>
  </nav>
)

const RouterComponent = () => (
  <Router>
    <div>
      <Nav/>
      <Route exact path="/" component={App}/>
      <Route exact path="/households/new" component={Household}/>
    </div>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();ReactDOM.render(
    <RouterComponent />,
  document.getElementById('root')
);

registerServiceWorker();
