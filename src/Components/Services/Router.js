import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Login/Login';

class Router extends Component {
   
    render() { 
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={Login}/>
                </Switch>
            </BrowserRouter>
         );
    }
}
 
export default Router;