const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
app.use(express.json());

const pedidosPorMesa = {};

const funcoes = {
    PedidoEnviado: (pedido) => {
        const pedidos = pedidosPorMesa[pedido.mesa];
        const pedidoParaAtualizar = pedidos.find(o => o.idPedido === pedido.idPedido);
        pedidoParaAtualizar.status = pedido.status;
        axios.post('http://192.168.0.11:1000/eventos', {
            tipo: 'PedidoAtualizado',
            dados: {
                mesa: pedido.mesa,
                idPedido: pedido.idPedido,
                prato: pedido.prato,
                montagem: pedido.montagem,
                acompanhamentos: pedido.acompanhamentos,
                status: pedido.status
            }
        })
    }
}

app.get('/mesas/:mesa/pedidos', (req, res) => {
    res.send(pedidosPorMesa[req.params.mesa] || [])
});

app.post('/mesas/:mesa/pedidos', async (req, res) => {
    const idPedido = uuidv4();
    const { prato, montagem, acompanhamentos } = req.body;
    const pedidosDaMesa = pedidosPorMesa[req.params.mesa] || [];
    pedidosDaMesa.push({ mesa: req.params.mesa, idPedido: idPedido, prato, montagem, acompanhamentos, status: 'Enviando para cozinha...' });
    pedidosPorMesa[req.params.mesa] = pedidosDaMesa;
    await axios.post('http://192.168.0.11:1000/eventos', {
        tipo: 'PedidoCriado',
        dados: {
            mesa: req.params.mesa,
            idPedido: idPedido,
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
        // console.log(req.body);
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({ msg: 'ok' });
});

app.listen(3000, () => {
    console.log('Pedidos. Porta 3000.');
});