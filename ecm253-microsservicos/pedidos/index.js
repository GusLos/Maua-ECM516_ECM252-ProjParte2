const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const status = require('../../models/tipos-status.json');
app.use(express.json());
app.use(cors());

const BDpedidos = [];

const funcoes = {
    PedidoEnviado: (pedido) => {
        const pedidoParaAtualizar = BDpedidos.find(p => p.idPedido === pedido.idPedido);
        const indicePedidoParaAtualizar = BDpedidos.indexOf(pedidoParaAtualizar)
        if (indicePedidoParaAtualizar > -1){
            BDpedidos[indicePedidoParaAtualizar] = pedido
        }
        else{
            console.log('Falha ao atualizar pedido. Pedido não existe.')
        }
        axios.post('http://localhost:1000/eventos', {
        // axios.post('http://barramento-de-eventos-service:1000/eventos', {
            tipo: 'PedidoAtualizado',
            dados: pedido
        })
    },
    PedidoCanceladoAtualizado: async (pedidoCancelado) => {
        const quantidadeDePedidos = BDpedidos.length;
        for (let i = 0; i < quantidadeDePedidos; i++){
            const pedido = BDpedidos.shift();
            if (pedido.idPedido !== pedidoCancelado.idPedido){
                BDpedidos.push(pedido)
            }
        }
        await axios.post('http://localhost:1000/eventos', {
        // await axios.post('http://barramento-de-eventos-service:1000/eventos', {
            tipo: 'PedidoCanceladoConfirmado',
            dados: pedidoCancelado
        });
    },
    PedidoProntoAtualizado: async (pedidoPronto) => {
        const quantidadeDePedidos = BDpedidos.length;
        for (let i = 0; i < quantidadeDePedidos; i++){
            const pedido = BDpedidos.shift();
            if (pedido.idPedido !== pedidoPronto.idPedido){
                BDpedidos.push(pedido);
            }
        }
        await axios.post('http://localhost:1000/eventos', {
        // await axios.post('http://barramento-de-eventos-service:1000/eventos', {
            tipo: 'PedidoProntoConfirmado',
            dados: pedidoPronto
        });
    }
}

app.get('/mesas/:idMesa/pedidos', (req, res) => {
    const pedidosPorMesa = BDpedidos.filter((pedido) => pedido.idMesa === req.params.idMesa) || [];
    res.send(pedidosPorMesa);
});

app.get('/pedidos', (req, res) => {
    res.send(BDpedidos);
})

app.post('/mesas/:idMesa/pedidos', async (req, res) => {
    const idPedido = uuidv4();
    const date = new Date();
    const horaPedido = date.toLocaleTimeString();
    const pedidoNovo = {idPedido, idMesa: req.params.idMesa, tipoPedido: req.body.tipoPedido, horaPedido, ...req.body, status: status.ENVIANDO_COZINHA}; // Mudar isso
    BDpedidos.push(pedidoNovo);
    await axios.post('http://localhost:1000/eventos', {
    // await axios.post('http://barramento-de-eventos-service:1000/eventos', {
        tipo: 'PedidoCriado',
        dados: pedidoNovo
    });
    res.status(200).send({msg: 'OK'})
});

app.put('/pedido', async (req, res) => {
    const pedidoParaAtualizar = BDpedidos.find(p => p.idPedido === req.body.idPedido);
    await axios.post('http://localhost:1000/eventos', {
    // await axios.post('http://barramento-de-eventos-service:1000/eventos', {
        tipo: definirAcaoPedido(req.body.acao),
        dados: pedidoParaAtualizar
    })
    res.status(200).send({pedidoParaAtualizar})
})

const definirAcaoPedido = (acao) => {
    if(acao.toLowerCase() === 'cancelar'){
        return 'PedidoCancelado'
    }
    if(acao.toLowerCase() === 'pronto'){
        return 'PedidoPronto'
    }
}

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({ msg: 'ok' });
});

app.listen(3000, () => {
    console.log('Pedidos. Porta 3000.');
});