const express = require('express');
const app = express();
const axios = require('axios');
const tipo = require('../../models/tipos-pedido.json')
app.use(express.json());

const BDconsulta = {};

const funcoes = {
    MesaCriada: (mesa) => {
        BDconsulta[mesa.idMesa] = {mesa: mesa.mesa, horaChegada: mesa.horaChegada, status: mesa.status};
    },
    MesaAberta: (mesa) => {
        BDconsulta[mesa.idMesa].status = mesa.status
    },
    PedidoCriado: (pedido) => {
        const idMesaPedidoNovo = pedido.idMesa;
        delete pedido.idMesa
        const pedidos = BDconsulta[idMesaPedidoNovo]['pedidos'] || [];
        pedidos.push(pedido);
        BDconsulta[idMesaPedidoNovo]['pedidos'] = pedidos;
    }
};

app.get('/mesas', (req, res) => {
    res.status(200).send(BDconsulta);
});

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send(BDconsulta);
});

app.listen(4000, async () => {
    console.log('Consultas. Porta 4000.');
    const resp = await axios.get('http://localhost:1000/eventos');
    resp.data.forEach((valor, indice, colecao) => {
        try {
            funcoes[valor.tipo](valor.dados);
        } catch (e) { }
    });
});