import React, { Component } from 'react'
import './Navbar.scss'
import {injector} from 'react-services-injector';
class Navbar extends Component {
    render() {
        const {RoomService}= this.services;
        return (
            <div className="nav shadow-sm">
                <div className="nav-element-left">
                    <div className="user-name">
                        {RoomService.userName} 
                    </div>
                </div>
                <div className="nav-element-rigth">
                    <span className="span-name" >Estadisticas</span>
                    <span className="span-name" onClick={()=> this.props.signOut()}>Salir</span>
                </div>
            </div>
        );
    }
}

export default injector.connect(Navbar, {toRender: ['RoomService','LoginService']});
