import React, { Component } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        return (
            <div className="nav shadow-sm">
                <div className="nav-element-left">
                    <div className="user-name">
                        luis
                    </div>
                </div>
                <div className="nav-element-rigth">
                    <Link  to={{ pathname: '/statistic'}}>
                    <span className="span-name" >Estadisticas</span>
                    </Link>
                    <span className="span-name" onClick={()=> this.props.signOut()}>Salir</span>
                </div>
            </div>
        );
    }
}

export default Navbar;
