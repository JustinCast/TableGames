import React, { Component } from 'react'
import './Navbar.scss'
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <div className="nav shadow-sm mb-5 bg-white">
                <div className="nav-element-left">
                    <div className="user-name">
                        Nombre de usuario
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

export default Navbar;