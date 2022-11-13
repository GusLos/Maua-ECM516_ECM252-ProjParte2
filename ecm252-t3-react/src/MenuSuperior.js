import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom';

const MenuSuperior = (props) => {
    return (
        <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
                <Link className={`nav-link ${useLocation().pathname === '/pedidos' ? 'active' : ''}`} to="/pedidos">Pedidos</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${useLocation().pathname === '/' ? 'active' : ''}`} to="/">Menu</Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link ${useLocation().pathname === '/mesas' ? 'active' : ''}`} to="/mesas">Mesas</Link>
            </li>
        </ul>
    )
}

export default MenuSuperior;