const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

const BDconsulta = {};

const funcoes = {
    MesaCriada: (mesa) => {
        BDconsulta[mesa.idMesa] = {mesa: mesa.mesa};
    },
    PedidoCriado: (pedido) => {
        const pedidos = BDconsulta[pedido.idMesa]['pedidos'] || [];
        const pedidoNovo = { idPedido: pedido.idPedido, horaPedido: pedido.horaPedido, prato: pedido.prato, montagem: pedido.montagem, acompanhamentos: pedido.acompanhamentos }
        pedidos.push(pedidoNovo);
        // pedidos.push(pedido);
        BDconsulta[pedido.idMesa]['pedidos'] = pedidos;
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