import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'



import { Link } from 'react-router-dom';

// const ativar = (idPagina) => {
//     if (this.props.pagina === idPagina){
//         return "active"
//     }
//     else {
//         return ""
//     }
// }


export class MenuSuperior extends React.Component{
    render() {
        return(
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'pedidos' ? 'active' : ''}`} to="/pedidos">Pedidos</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'pedidos' ? 'active' : ''}`} to="/">Menu</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${this.paginaAtual === 'pedidos' ? 'active' : ''}`} to="/mesas">Mesas</Link>
                </li>
            </ul>
        )
    }
}

