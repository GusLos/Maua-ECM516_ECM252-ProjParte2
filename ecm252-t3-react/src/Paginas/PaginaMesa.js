import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Cartao } from "../Cartao";

export default class PaginaMesa extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            idMesa: this.props.match.params.idmesa,
            mesa: {},
            pedidosDaMesa: [],
            totalGastoMesa: 0
        }
    }

    buscarMesa = async () => {
        const resposta = await axios.get(`http://localhost:2000/mesas`);
        const mesas = resposta.data;
        const mesa = mesas.find((m) => m.idMesa === this.state.idMesa)
        this.setState({ 
            mesa,
            status: mesa.status,
            horaChegada: mesa.horaChegada
        });
    }

    buscarPedidos = async () => {
        await axios.get(`http://localhost:3000/mesas/${this.state.idMesa}/pedidos`).then(res => {
            // console.log(res.data)
            this.setState({pedidosDaMesa: res.data})
        });
        // console.log(resposta.data.map((pedido, indice) => {console.log(pedido)}))
    }

    buscarConta = async () => {
        await axios.get(`http://localhost:6000/mesas/contas/${this.state.idMesa}`).then(res => {
            // console.log(res.data.valorConta)
            this.setState({totalGastoMesa: res.data.valorConta})
        })
    }

    cabecalhoCartaoPedido = (pedido) => {
        return (
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col">{pedido.tipoPedido}</div>
                    <div className="col">{pedido.status}</div>
                </div>
            </div>
        )
    }

    corpoCartaoPedido = (pedido) => {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col">{pedido.pedido}</div>
                    {pedido.acompanhamentos ? <div className="col">{pedido.acompanhamentos.join(" - ")}</div> : ''}
                </div>
            </div>
        )
    }

    mostrarPedidosDaMesa = (pedido, indice) => {
            return(
                <div  key={indice} className="vstack gap-3 mb-3">
                    <Cartao cabecalho={this.cabecalhoCartaoPedido(pedido)}>{this.corpoCartaoPedido(pedido)}</Cartao>
                </div>
            )
    }

    componentDidMount() {
        this.buscarMesa();
        this.buscarPedidos();
        this.buscarConta();
    }

    componentDidUpdate() {
        this.buscarMesa();
        this.buscarPedidos();
        this.buscarConta();
    }

    render(){
        return(
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col"><h1>Mesa: {this.state.mesa.mesa}</h1></div>
                    <div className="col"><h1>{this.state.mesa.horaChegada}</h1></div>
                </div>
                <div className="row row-cols-1">
                    <div className="col">
                    <Link className='btn btn-large btn-primary' to={`/mesas/${this.state.idMesa}/pedidos`} >Adicionar Pedido</Link>
                    </div>
                    <div className="col"><h3>Status: {this.state.mesa.status}</h3></div>
                    <div className="col"><h3>Total gasto: {this.state.totalGastoMesa}</h3></div>
                </div>
                <div className="row row-cols-1">
                    {this.state.pedidosDaMesa.map((pedido, indice) => {
                        return this.mostrarPedidosDaMesa(pedido, indice)
                    })}
                </div>
            </div>
        )
    }
}