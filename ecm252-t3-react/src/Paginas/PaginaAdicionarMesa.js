import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Cartao } from '../Cartao';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'

export class PaginaAdicionarMesa extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idMesa: ''
        }
    }

    aoDigitar = (evento) => {
        console.log(evento.target.value)
        this.setState({idMesa: evento.target.value});
    }

    enviar = async () => {
        const resposta =  await axios.post('http://localhost:2000/mesas', {
            mesa: this.state.idMesa
        })
        this.props.history.push(`/mesas/mesa/${resposta.data.idMesa}`)
        // console.log(resposta.data.idMesa)
        
    }

    render() {
        return (
            <div className="container">
                <div className="row row-cols-2 g-3 m-2">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id='inputIdMesa'>Mesa: </span>
                        <input type="text" className='form-control' placeholder='Número / Nome da mesa' aria-describedby='inputIdMesa' onChange={this.aoDigitar} />
                        <button className='btn btn-outline-primary' type='button' id='inputIdMesa' onClick={this.enviar}>Abrir</button>
                    </div>
                </div>
            </div>
        )
    }
}