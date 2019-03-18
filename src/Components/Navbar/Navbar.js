import React, { Component } from 'react'
import './Navbar.scss'
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
