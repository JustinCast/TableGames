import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, IndexRoute  } from 'react-router-dom'
import Login from '../Login/Login';
import Error from '../Error-Page/Error';
import CreateRoom from '../CreateRoom/CreateRoom';

class Router extends Component {
    render() { 
        return ( 
            <BrowserRouter>
                <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/create-room" component={CreateRoom} />    
                <Route component={Error} />                    

                </Switch>
            </BrowserRouter>
         );
    }
}
 
export default Router;