import axios from "axios";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Cartao } from '../Cartao';
import Feedback from '../Feedback';

export class PaginaPedidos extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            pedidos: [],
            mesas: [],
            mapaMesas: {},
            hora: null
        }
    }

    timer = null

    buscarPedidos = async () => {
        await axios.get(`http://localhost:3000/pedidos`).then( res => {
            // console.log(res.data)
            this.setState({pedidos: res.data});
        })
    }

    buscarMesas = async () => {
        await axios.get(`http://localhost:2000/mesas`).then(res => {
            this.setState({mesas: res.data});
            this.criarMapaMesas();
        })
    }

    criarMapaMesas = () => {
        const mapa = {} 
        this.state.mesas.forEach((mesa) => {
            mapa[mesa.idMesa] = mesa.mesa
        })
        this.setState({mapaMesas: mapa})
    }

    mostrarPedidos = (pedido, indice) => {
        return (
            <Cartao key={indice} cabecalho={this.cabecalhoPedido(pedido)} rodape={this.rodapePedido()} > {this.corpoPedido(pedido)} </Cartao>
        )
    }

    cabecalhoPedido = (pedido) => {
        return(
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col">Mesa: {this.state.mapaMesas[pedido.idMesa]}</div>
                    {/* <div className="col">Tempo corrido: {pedido.horaPedido}</div> */}
                    <div className="col">Tempo corrido: {this.calcularTempoCorrido(pedido)}</div>
                </div>
            </div>
        )
    }

    corpoPedido = (pedido) => {
        return(
            <div className="container text-center">
                <div className="row fs-5 my-3">
                    <div className="col">{pedido.pedido}</div>
                    {pedido.acompanhamentos ? <div className="col">{pedido.acompanhamentos.join(" - ")}</div> : ''}
                </div>
            </div>
        )
    }

    rodapePedido = () => {
        return(
            <div className="container">
                <Feedback textoOK="Finalizar pedido" textoNOK="Cancelar pedido"></Feedback>
            </div>
        )
    }

    calcularTempoCorrido = (pedido) => {
        const tempoCorrido = []
        if(this.state.hora){
            const horaPedido = pedido.horaPedido.split(":")
            const horaAtual = this.state.hora.split(":")
            horaPedido.forEach((unidadeTempoStr, indice) => {
                const unTempoPedido = parseInt(unidadeTempoStr, 10)
                const unTempoAtual = parseInt(horaAtual[indice], 10)
                if((unTempoAtual - unTempoPedido) < 0){
                    tempoCorrido[indice - 1] = tempoCorrido[indice - 1] - 1
                    tempoCorrido.push(unTempoAtual - unTempoPedido + 60)
                }
                if((unTempoAtual - unTempoPedido) >= 0){
                    tempoCorrido.push(unTempoAtual - unTempoPedido)
                }
            })
        }
        else {
            tempoCorrido.push("0")
        }
        return tempoCorrido.join(":")
    }

    componentDidMount() {
        this.buscarPedidos();
        this.buscarMesas();
        this.timer = setInterval(() => {
            this.setState({hora: new Date().toLocaleTimeString()})
        }, 1000)
    }

    componentDidUpdate() {
    console.log(this.state.hora)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="container mt-2">
                <div className="row justify-content-center">
                    <div className="vstack gap-3 col-md-8">
                        <h1>Pedidos</h1>
                        {this.state.pedidos.map((pedido, indice) => {
                            return(this.mostrarPedidos(pedido, indice))
                        })}
                    </div>
                </div>
            </div>
        )
    }
}


