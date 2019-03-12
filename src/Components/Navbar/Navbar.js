import React, { Component } from 'react'
import './Navbar.scss'

import { injector } from 'react-services-injector';
import services from '../Services/RoomService';

injector.register(services);

class Navbar extends Component {
    render() {
        const { RoomService } = this.services;
        return (
            <div className="nav shadow-sm">
                <div className="nav-element-left">
                    <div className="user-name">
                    {RoomService.userName}
                    </div>
                </div>
                <div className="nav-element-rigth">
                    <span className="span-name">
                        Estadisticas
                    </span>
                    <span className="span-name">
                        Salir
                    </span>
                </div>
            </div>
        );
    }
}

export default injector.connect(Navbar, { toRender: ['RoomService'] });