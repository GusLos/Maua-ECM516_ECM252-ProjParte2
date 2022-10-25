const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const date = new Date();
const tipo = require('./tipos-pedido.json')
app.use(express.json());

// const pedidosPorMesa = {};

const BDpedidos = [];

const funcoes = {
    PedidoEnviado: (pedido) => {
        // console.log('Entrei no pedido mas nã atualizaei.')
        // const pedidos = pedidosPorMesa[pedido.idMesa];

        const pedidoParaAtualizar = BDpedidos.find(p => p.idPedido === pedido.idPedido);
        // const pedidoParaAtualizar = pedidos[pedido.idPedido]

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
    // console.log(req)
    if(tipoPedido === tipo.PF){
        const { prato } = req.body
        console.log('Escolheu PF.')
        return { prato, status: 'Enviando para cozinha...' }
    }
    if (tipoPedido === tipo.MONTAGEM){
        const { prato, acompanhamentos  } = req.body
        console.log('Escolheu Montagem.')
        return { prato, acompanhamentos, status: 'Enviando para cozinha...' }
    }
    if (tipoPedido === tipo.BEBIDA){
        const { bebida } = req.body
        console.log('Escolheu Bebida.')
        return { bebida, status: 'Enviando para copa...' }
    }
    console.log('Não fiz nada.')
}

app.get('/mesas/:idMesa/pedidos', (req, res) => {
    // res.send(pedidosPorMesa[req.params.idmesa] || [])
    const pedidosPorMesa = BDpedidos.filter((pedido) => pedido.idMesa === req.params.idMesa) || [];
    res.send(pedidosPorMesa)
});

app.get('/pedidos', (req, res) => {
    res.send(BDpedidos)
})

app.post('/mesas/:idMesa/pedidos', async (req, res) => {
    const idPedido = uuidv4();

    const pedido = definirPedido(req)
    // const { prato, montagem, acompanhamentos } = req.body; // +ou-

    // const pedidosDaMesa = pedidosPorMesa[req.params.idMesa] || [];
    const horaPedido = date.toLocaleTimeString();

    // pedidosDaMesa.push({idPedido, idMesa:req.params.idMesa , horaPedido, ...pedido})
    // pedidosDaMesa.push({ idMesa: req.params.idMesa, idPedido: idPedido, horaPedido, prato, montagem, acompanhamentos, status: 'Enviando para cozinha...' });

    // pedidosPorMesa[req.params.idMesa] = pedidosDaMesa;

    BDpedidos.push({idPedido, idMesa: req.params.idMesa, tipoPedido: req.body.tipoPedido, horaPedido, ...pedido})
    // pedidos[idPedido] = {horaPedido, ...pedido}

    console.log(BDpedidos)

    // await axios.post('http://localhost:1000/eventos', {
    //     tipo: 'PedidoCriado',
    //     dados: {
    //         idMesa: req.params.idMesa,
    //         idPedido: idPedido,
    //         horaPedido,
    //         prato,
    //         montagem,
    //         acompanhamentos,
    //         status: 'Enviando para cozinha...'
    //     }
    // });
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