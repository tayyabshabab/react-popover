import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Popover from './popover/index';

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
          trigger="hover"
          placement="left"
          title="Title"
          content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        >
          <button>This is a very very big button</button>
        </Popover>

        <br /><br /><br />
        <Popover
          // trigger="click"
          placement="right"
        >
          <button>This is another very very big button</button>
        </Popover>

        <br /><br /><br />
        <Popover
          // trigger="click"
          placement="top"
        >
          <button>This is another very very big button</button>
        </Popover>

        <br /><br /><br />
        <Popover
          trigger="click"
          placement="bottom"
        >
          <button>This is another very very big button</button>
        </Popover>
      </div>
    );
  }
}

export default App;
