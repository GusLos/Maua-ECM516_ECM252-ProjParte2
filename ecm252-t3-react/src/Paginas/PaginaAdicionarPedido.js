import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const cardapioAcompanhamentos = ['Batata', 'Salada', 'Legumes', 'Arroz', 'Feijao', 'Cebola', 'Cenoura']

export default class PaginaMesa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idMesa: this.props.match.params.idmesa,
            tipoPedido: 'Prato feito',
            prato: 'File',
            acompanhamentos: [],
            quantidadeAcompanhamento: 4
        }
    }

    // buscarMesa = async () => {
    //     const resposta = await axios.get(`http://localhost:2000/mesas`);
    //     const mesas = resposta.data;
    //     const mesa = mesas.find((m) => m.idMesa === this.state.idMesa)
    //     this.setState({ 
    //         mesa
    //     });
    // }

    // componentDidMount() {
    //     this.buscarMesa();
    // }

    mostrar = (evento) => {
        // console.log('evento:');
        // console.log(evento.target.defaultValue)
        // console.log(evento.target.checked);
        let acompanhamentosAtual = this.state.acompanhamentos;
        let quantidadeAcompanhamentosAtual = this.state.quantidadeAcompanhamento
        if (evento.target.checked){
            acompanhamentosAtual.push(evento.target.defaultValue)
            quantidadeAcompanhamentosAtual--
        }
        if (!evento.target.checked){
            acompanhamentosAtual = this.state.acompanhamentos.filter(item => item !== evento.target.defaultValue)
            quantidadeAcompanhamentosAtual++
        }
        this.setState({
            quantidadeAcompanhamento: quantidadeAcompanhamentosAtual,
            acompanhamentos: acompanhamentosAtual
        })
    }

    emMudanca = (evento) => {
        const variavel = evento.target.name 
        const valor = evento.target.value
        this.setState({[variavel]: valor })
    }

    selecionarTipo = () => {
        return (
            <select onChange={this.emMudanca} defaultValue={"Prato feito"} name="tipoPedido" id="selectPedido" className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" >
                <option value="Prato feito" >Prato Feito</option>
                <option value="Montagem">Montagem</option>
            </select>
        )
    }

    selecionarPrato = () => {
        return (
            <div className="input-group my-4">
                <label htmlFor="SelecionarPrato" className="input-group-text">Prato: </label>
                <select defaultValue={'File'} className="form-select" id="SelecionarPrato" onChange={this.emMudanca} name="prato">
                    <option value="File">File</option>
                    <option value="Frango">Frango</option>
                    <option value="Peixe">Peixe</option>
                    <option value="Bebida">Massa</option>
                </select>
            </div>
        )
    }

    montarPrato = () => {
        return (
            <div className="row row-cols-2">

                {cardapioAcompanhamentos.map(item => {
                    return(
                        <div className="col form-check my-1" key={`checkbox${item}`}>
                            <input className="form-check-inpuy" disabled={this.state.quantidadeAcompanhamento === 0 && !this.state.acompanhamentos.includes(item)} checked={this.state.acompanhamentos.includes(item)} type="checkbox" value={item} id={`checkbox${item}`} onClick={this.mostrar} />
                            <label className="form-check-label" form={`checkbox${item}`}>{item}</label>
                        </div>
                    )
                })}
            </div>
        )
    }

    confirmarPedido = async () => {

        if (this.state.tipoPedido === "Montagem"){
            await axios.post(`http://localhost:3000/mesas/${this.state.idMesa}/pedidos`, {
                tipoPedido: this.state.tipoPedido,
                acompanhamentos: this.state.acompanhamentos,
                pedido: this.state.prato
            })
        }
        if (this.state.tipoPedido === "Prato feito"){
            await axios.post(`http://localhost:3000/mesas/${this.state.idMesa}/pedidos`, {
                tipoPedido: this.state.tipoPedido,
                pedido: this.state.prato
            })
        }
        console.log('Pedido realizado.')
    }

    botaoConfirmarPedido = () => {
        return(
            <Link className='btn btn-large btn-primary' to={`/mesas/mesa/${this.state.idMesa}`} onClick={this.confirmarPedido} >Confirmar Pedido</Link>
        )
    }

    mostraTudo = (event) => {
        console.log(this.state)
        event.preventDefault();
    }

    render() {
        // console.log(this.state.mesa)
        return (
            <div className="container">
                <form action="">
                    {this.selecionarTipo()}
                    <div className="border-bottom"></div>
                    {this.selecionarPrato()}
                    {this.state.tipoPedido === "Montagem" ? this.montarPrato() : ''}
                    {this.botaoConfirmarPedido()}
                    {/* <button onClick={this.mostraTudo} >Clica aqui</button> */}
                </form>
            </div>
        )
    }
}