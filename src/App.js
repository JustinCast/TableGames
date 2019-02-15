import React, { Component } from 'react';
import './Style/app.css';
import Login from './Components/Login/Login';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Login />
      </React.Fragment>
    );
  }
}

export default App;
