import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import AllSessions from '../AllSessions/AllSessions'
import './MainScreen.scss';

class MainScreen extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navbar/>
                <AllSessions/>
            </div>
        );
    }
}
 
export default MainScreen;