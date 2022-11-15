import axios from "axios";
import React from "react";

export default class PaginaMesa extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            idMesa: this.props.match.params.idmesa,
            mesa: {},
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

    componentDidMount() {
        this.buscarMesa();
    }

    render(){
        console.log(this.state.mesa)
        return(
            <div className="container">
                <div className="row row-cols-2">
                    <div className="col"><h1>Mesa: {this.state.mesa.mesa}</h1></div>
                    <div className="col"><h1>{this.state.mesa.horaChegada}</h1></div>
                </div>
                <div className="row row-cols-1">
                    <div className="col"><h3>Status: {this.state.mesa.status}</h3></div>
                    <div className="col"><h3>Total gasto: </h3></div>
                </div>
            </div>
        )
    }
}