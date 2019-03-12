import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Login/Login';
import Error from '../Error-Page/Error';
import CreateRoom from '../CreateRoom/CreateRoom';

import {injector} from 'react-services-injector';
import services from '../Services/index_services';

injector.register(services);

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
