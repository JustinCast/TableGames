import React, { Component } from 'react';
import './Style/app.css';
import Router from './Components/Services/Router';
import MainScreen from './Components/MainScreen/MainScreen'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MainScreen />
      </React.Fragment>
    );
  }
}

export default App;
