import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Pedido from './Pedido'
import {Cartao} from './Cartao';
import Feedback from './Feedback';

const cabecalho = () => {
    return(
        <div className="container">
            <div className="row row-cols-2">
                <div className="col"><p className="m-1">Status: Aberta</p></div>
                <div className="col"><p className="m-1">Chegada: 12:30</p></div>
            </div>
        </div>
    ) 
}

const corpo =() => {
    return(
        <div className="container"><h1 className="text-center">Café A</h1></div>
    )
}

const rodape = () => {
    return(
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-auto">
                    <button type="button" className="btn btn-large btn-primary">Detalhes da mesa</button>
                </div>
            </div>
        </div>
    )
}


export class PaginaMesas extends React.Component{

  render(){
    return(
      <div className="container">
        <div className="row">
            <div className="col">
                <h1>Mesas</h1>
            </div>
        </div>
        <div className="row row-cols-3 g-3">
            <div className="col">
                <Cartao cabecalho={cabecalho()} rodape={rodape()}>{corpo()}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho()} rodape={rodape()}>{corpo()}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho()} rodape={rodape()}>{corpo()}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho()} rodape={rodape()}>{corpo()}</Cartao>
            </div>
        </div>
      </div>
    )
  }
}


