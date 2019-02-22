import React, { Component } from 'react'
import './Navbar.scss'
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <div className="nav shadow-sm mb-5 bg-white">
                <div className="nav-element-left">
                    <p className="user-name">
                        Nombre de usuario
                    </p>
                </div>
                <div className="nav-element-rigth">
                    <Button className="button">Ir al juego</Button>
                    <Button className="button">Ir al juego</Button>
                </div>
            </div>
        );
    }
}

export default Navbar;