import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Household from './Household';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
// ReactDOM.render(
//     <App/>,
//   document.getElementById('root')
// );

// registerServiceWorker();
