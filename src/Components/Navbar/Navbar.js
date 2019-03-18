import React, { Component } from 'react'
import './Navbar.scss'
import Button from '@material-ui/core/Button';
class Navbar extends Component {
    render() {
        return (
            <div className="nav shadow-sm">
                <div className="nav-element-left">
                    <div className="user-name">
                        { JSON.parse(localStorage.getItem('actualUser')).name}
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
