import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // eslint-disable-line

injectTapEventPlugin();

ReactDOM.render(<Main />, document.getElementById('app'));
