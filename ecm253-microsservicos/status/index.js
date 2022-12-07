const express = require('express');
const app = express();
const axios = require('axios');
const status = require('../../models/tipos-status.json')
app.use(express.json());

const funcoes = {
    PedidoCriado: (pedido) => {
        pedido.status = status.NA_COZINHA;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'PedidoEnviado',
            dados: pedido
        });
    },
    PedidoCancelado: (pedido) => {
        pedido.status = status.CANCELADO;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'PedidoCanceladoAtualizado',
            dados: pedido
        })
    },
    PedidoPronto: (pedido) => {
        pedido.status = status.PRONTO;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'PedidoProntoAtualizado',
            dados: pedido
        })
    },
    MesaCriada: (mesa) => {
        mesa.status = status.MESA_ABERTA;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'MesaAberta',
            dados: mesa
        })
    },
    MesaFechando: (mesa) => {
        mesa.status = status.MESA_FECHADA;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'MesaFechada',
            dados: mesa
        })
    }
};

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({ msg: 'ok'});
});

app.listen(5000, () => {
    console.log('Status. Porta 5000.')
})