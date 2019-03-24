import React, { Component } from 'react'
import './Navbar.scss';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="nav shadow-sm">
        <div className="nav-element-left">
          <div className="user-name">
          { JSON.parse(localStorage.getItem("actualUser")) !== null ? JSON.parse(localStorage.getItem("actualUser")).name : null}
          </div>
        </div>
        <div className="nav-element-rigth">
        <div className="span-name">
        <Link  to={{ pathname: '/statistic'}}>
          <span>Estadisticas</span>
        </Link>
        </div> 
          <span className="span-name" onClick={()=> this.props.signOut()}>Salir</span>
        </div>
      </div>
    );
  }
}

export default Navbar;