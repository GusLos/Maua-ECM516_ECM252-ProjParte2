const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const tipo = require('../../models/tipos-pedido.json');
const status = require('../../models/tipos-status.json');
app.use(express.json());

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

function definirPedido(req){
    tipoPedido = req.body.tipoPedido;
    // console.log(req);
    if(tipoPedido === tipo.PF){
        const { prato } = req.body;
        // console.log('Escolheu PF.');
        return { prato, status: status.ENVIANDO_COZINHA };
    }
    if (tipoPedido === tipo.MONTAGEM){
        const { prato, acompanhamentos  } = req.body;
        // console.log('Escolheu Montagem.');
        return { prato, acompanhamentos, status: status.ENVIANDO_COZINHA };
    }
    if (tipoPedido === tipo.BEBIDA){
        const { bebida } = req.body;
        // console.log('Escolheu Bebida.');
        return { bebida, status: status.ENVIANDO_COPA };
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
    const pedido = definirPedido(req);
    const date = new Date();
    const horaPedido = date.toLocaleTimeString();
    const pedidoNovo = {idPedido, idMesa: req.params.idMesa, tipoPedido: req.body.tipoPedido, horaPedido, ...pedido};
    BDpedidos.push(pedidoNovo);
    await axios.post('http://localhost:1000/eventos', {
        tipo: 'PedidoCriado',
        dados: pedidoNovo
    });
    // res.status(201).send(pedidosDaMesa);
    res.status(200).send({msg: 'OK'})
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