const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const date = new Date();
app.use(express.json());

const pedidosPorMesa = {};

const funcoes = {
    PedidoEnviado: (pedido) => {
        console.log('Entrei no pedido mas nã atualizaei.')
        const pedidos = pedidosPorMesa[pedido.idMesa];
        const pedidoParaAtualizar = pedidos.find(o => o.idPedido === pedido.idPedido);
        pedidoParaAtualizar.status = pedido.status;
        axios.post('http://localhost:1000/eventos', {
            tipo: 'PedidoAtualizado',
            dados: {
                idMesa: pedido.idMesa,
                idPedido: pedido.idPedido,
                prato: pedido.prato,
                montagem: pedido.montagem,
                acompanhamentos: pedido.acompanhamentos,
                status: pedido.status
            }
        })
    }
}

app.get('/mesas/:idmesa/pedidos', (req, res) => {
    res.send(pedidosPorMesa[req.params.idmesa] || [])
});

app.post('/mesas/:idMesa/pedidos', async (req, res) => {
    const idPedido = uuidv4();
    const { prato, montagem, acompanhamentos } = req.body;
    const pedidosDaMesa = pedidosPorMesa[req.params.idMesa] || [];
    const horaPedido = date.toLocaleTimeString();
    pedidosDaMesa.push({ idMesa: req.params.idMesa, idPedido: idPedido, horaPedido, prato, montagem, acompanhamentos, status: 'Enviando para cozinha...' });
    pedidosPorMesa[req.params.idMesa] = pedidosDaMesa;
    console.log(pedidosPorMesa)
    await axios.post('http://localhost:1000/eventos', {
        tipo: 'PedidoCriado',
        dados: {
            idMesa: req.params.idMesa,
            idPedido: idPedido,
            horaPedido,
            prato,
            montagem,
            acompanhamentos,
            status: 'Enviando para cozinha...'
        }
    });
    res.status(201).send(pedidosDaMesa);
});

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({ msg: 'ok' });
});

app.listen(3000, () => {
    console.log('Pedidos. Porta 3000.');
});