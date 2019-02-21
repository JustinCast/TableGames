import React, { Component } from 'react';
import './Style/app.css';
import Router from './Components/Services/Router';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router />
      </React.Fragment>
    );
  }
}

export default App;
