import React, { Component } from 'react';
import './Style/app.css';
import MainScreen from './Components/MainScreen/MainScreen'

//here we go
import {injector} from 'react-services-injector';
import IndexServices from './Components/Services/IndexServices';
injector.register(IndexServices);

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
