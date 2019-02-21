import React, { Component } from 'react'

class Navbar extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <nav className ="navbar">
                    <a className="navbar-brand">Nombre del jugador</a>
                    <div className="form-inline">
                        <button className="btn">Estadisticas</button>
                        <button className="btn">Salir</button>
                    </div>
                </nav>
            </div>
        );
    }
}
 
export default Navbar;