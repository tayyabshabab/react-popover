import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Popover from './Popover/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Popover
          triggerOn="click"
          placement="left"
          title="Lorem Ipsum!"
          content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        >
          <button>Lorem Ipsum!</button>
        </Popover>
      </div>
    );
  }
}

export default App;
