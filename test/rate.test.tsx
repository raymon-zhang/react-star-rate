import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StarsRating from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StarsRating />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
