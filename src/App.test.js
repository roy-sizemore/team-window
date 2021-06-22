import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Renders w/o error!', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
