import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Cartao } from "../Cartao";

export default class PaginaMesa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idMesa: this.props.match.params.idmesa,
            mesa: {},
            pedidosDaMesa: [],
            totalGastoMesa: 0,
            status: ''
        }
    }

    buscarMesa = async () => {
        try{
            const resposta = await axios.get(`http://localhost:2000/mesas`);
            const mesas = resposta.data;
            const mesa = mesas.find((m) => m.idMesa === this.state.idMesa)
            this.setState({
                mesa,
                horaChegada: mesa.horaChegada
            });
        }
        catch{}
    }

    buscarInfoMesa = async () => {
        await axios.get(`http://localhost:4000/mesas/${this.state.idMesa}`).then(res => {
            this.setState({
                totalGastoMesa: res.data.valorConta,
                status: res.data.status,
                pedidosDaMesa: res.data.pedidos
            })
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

    rodapeCartaoPedido = (pedido) => {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col">Status: {pedido.status ? pedido.status : 'Verificando'}</div>
                </div>
            </div>
        )
    }

    mostrarPedidosDaMesa = (pedido, indice) => {
        return (
            <div key={indice} className="vstack gap-3 mb-3">
                <Cartao cabecalho={this.cabecalhoCartaoPedido(pedido)} rodape={this.rodapeCartaoPedido(pedido)}>{this.corpoCartaoPedido(pedido)}</Cartao>
            </div>
        )
    }

    fecharMesa = async () => {
        await axios.put('http://localhost:2000/mesas', {
            acao: 'fechar', //não precisa
            idMesa: this.state.idMesa
        })
    }

    componentDidMount() {
        this.buscarMesa();
        this.buscarInfoMesa();
    }

    componentDidUpdate() {
        this.buscarMesa();
        this.buscarInfoMesa()
    }

    render() {
        return (
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col"><h1>Mesa: {this.state.mesa.mesa}</h1></div>
                    <div className="col"><h1>{this.state.mesa.horaChegada}</h1></div>
                    <div className="col">
                        <Link className='btn btn-large btn-primary' to={`/mesas/${this.state.idMesa}/pedidos`} >Adicionar Pedido</Link>
                    </div>
                    <div className="col">
                        <button type="button" className="btn btn-danger" onClick={this.fecharMesa}>Fechar</button>
                    </div>
                </div>
                <div className="row row-cols-1">
                    <div className="col"><h3>Status: {this.state.status}</h3></div>
                    <div className="col"><h3>Total gasto: {this.state.totalGastoMesa}</h3></div>
                </div>
                <div className="row row-cols-1">
                    {
                        this.state.pedidosDaMesa ?
                            Object.entries(this.state.pedidosDaMesa).map((pedido, indice) => {
                                return this.mostrarPedidosDaMesa(pedido[1], indice)
                            })
                            :
                            <div className="col"><h2>Sem Pedidos.</h2></div>
                    }
                </div>
            </div>
        )
    }
}