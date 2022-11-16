import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Cartao } from './Cartao';
import axios from 'axios';
import {Link} from 'react-router-dom'

export class PaginaMesas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mesas: []
        }
    }

    getMesas = async () => {
        const resposta = await axios.get(`http://localhost:2000/mesas`)
        this.setState({ mesas: resposta.data })
        // console.log(this.state.mesas)

    }

    cabecalho = (statusMesa, horaChegada) => {
        return (
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col"><p className="m-1">Status: {statusMesa}</p></div>
                    <div className="col"><p className="m-1">Chegada: {horaChegada}</p></div>
                </div>
            </div>
        )
    }

    corpo = (nomeMesa) => {
        return (
            <div className="container"><h1 className="text-center">{nomeMesa}</h1></div>
        )
    }

    rodape = (idMesa) => {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        {/* <button type="button" className="btn btn-large btn-primary" >Detalhes da mesa</button> */}
                        <Link className='btn btn-large btn-primary' to={`/mesas/mesa/${idMesa}`} >Detalhes</Link>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getMesas();
    }

    mostrarMesas = () => {
        return this.state.mesas.map((elemento, indice) => (
            <div className="col">
                <Cartao cabecalho={this.cabecalho(elemento.status, elemento.horaChegada)} rodape={this.rodape(elemento.idMesa)} key={indice} >{this.corpo(elemento.mesa)}</Cartao>
            </div>
        ))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Mesas</h1>
                    </div>
                </div>
                <div className="row row-cols-2 g-3">
                    {this.mostrarMesas()}
                </div>
            </div>
        )
    }
}


