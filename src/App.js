import React, { Component } from 'react';
import './Style/app.css';
import {injector} from 'react-services-injector';
import IndexServices from './Components/Services/IndexServices';
injector.register(IndexServices);
import Router from '../src/Components/Services/Router';

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
