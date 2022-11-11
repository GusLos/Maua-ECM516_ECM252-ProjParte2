import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'



import { Link } from 'react-router-dom';


export class MenuSuperior extends React.Component{

    // 

    render() {
        return(
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'pedidos' ? 'active' : ''}`} to="/pedidos">Pedidos</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'menu' ? 'active' : ''}`} to="/">Menu</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'mesas' ? 'active' : ''}`} to="/mesas">Mesas</Link>
                </li>
            </ul>
        )
    }
}

