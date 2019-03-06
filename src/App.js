import React, { Component } from 'react';
import './styles.scss';
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