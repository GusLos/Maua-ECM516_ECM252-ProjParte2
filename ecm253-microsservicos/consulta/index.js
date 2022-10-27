const express = require('express');
const app = express();
const axios = require('axios');
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
    },
    PedidoEnviado: (pedidoAtualizado) => {
        const idMesaPedidoNovo = pedidoAtualizado.idMesa;
        delete pedidoAtualizado.idMesa
        const pedidos = BDconsulta[idMesaPedidoNovo]['pedidos'] || [];
        const pedidoVelho = pedidos.find(p => p.idPedido === pedidoAtualizado.idPedido)
        pedidos.pop(pedidoVelho)
        pedidos.push(pedidoAtualizado);
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