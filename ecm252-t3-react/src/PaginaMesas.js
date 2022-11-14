import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Cartao} from './Cartao';
import axios from 'axios';

// const getMesas = async () => {
//     try{
//         const resposta = await axios.get(`http://localhost:2000/mesas`);
//         const listaMesas = resposta.data
//         console.log(listaMesas)
//         // listaMesas.map((elemento, indice) => {
//         //     console.log(`elemento ${elemento}, indice ${indice}`)
//         // })
        
//     }
//     catch (errors) {
//         console.log(errors)
//     }
// }

const cabecalho = (statusMesa, horaChegada) => {
    return(
        <div className="container">
            <div className="row row-cols-2">
                <div className="col"><p className="m-1">Status: {statusMesa}</p></div>
                <div className="col"><p className="m-1">Chegada: {horaChegada}</p></div>
            </div>
        </div>
    ) 
}

const corpo =(idMesa) => {
    return(
        <div className="container"><h1 className="text-center">{idMesa}</h1></div>
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

    constructor(props) {
        super(props);
        this.state = {
            mesas : []
        }
    }
    
    getMesas = async () => {
        const resposta = await axios.get(`http://localhost:2000/mesas`)
        this.setState({mesas: resposta.data})
        // console.log(this.state.mesas)
        
    }

    componentDidMount(){
        this.getMesas();
    }

    mostrarMesas = (listaMesas) => {
        return listaMesas
    }

  render(){
    return(
      <div className="container">
        <div className="row">
            <div className="col">
                <h1>Mesas</h1>
            </div>
        </div>
        <div className="row row-cols-2 g-3">

            {this.state.mesas.map((elemento, indice) => (
                <div className="col">
                    <Cartao cabecalho={cabecalho(elemento.status, elemento.horaChegada)} rodape={rodape()} key={indice} >{corpo(elemento.mesa)}</Cartao>
                </div>
            ))}

            {/* <div className="col">
                <Cartao cabecalho={cabecalho('aberta', '12:30')} rodape={rodape()}>{corpo('15')}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho('aberta', '13:15')} rodape={rodape()}>{corpo('2')}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho('aberta', '12:45')} rodape={rodape()}>{corpo('Café A')}</Cartao>
            </div>
            <div className="col">
                <Cartao cabecalho={cabecalho('fechada', '11:30')} rodape={rodape()}>{corpo('22')}</Cartao>
            </div> */}
        </div>
      </div>
    )
  }
}


