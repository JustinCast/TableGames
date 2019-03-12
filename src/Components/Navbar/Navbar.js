import React, { Component } from 'react'
import './Navbar.scss'
import Button from '@material-ui/core/Button';
import {injector} from 'react-services-injector';
class Navbar extends Component {
    render() {
        const {RoomService,LoginService}= this.services;
        return (
            <div className="nav shadow-sm mb-5 bg-whitek">
                <div className="nav-element-left">
                    <div className="user-name">
                        {LoginService.userName} 
                    </div>
                </div>
                <div className="nav-element-rigth">
                    <Button className="button" >Estadisticas</Button>
                    <Button className="button" onClick={()=> this.props.signOut()}>Salir</Button>
                </div>
            </div>
        );
    }
}

export default injector.connect(Navbar, {toRender: ['RoomService','LoginService']});
