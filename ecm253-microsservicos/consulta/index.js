const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

const baseConsulta = {};

const funcoes = {
    MesaCriada: (mesa) => {
        baseConsulta[mesa.mesa] = {};
    },
    PedidoCriado: (pedido) => {
        const pedidos = baseConsulta[pedido.mesa]['pedidos'] || [];
        // const pedidoNovo = { prato: pedido.prato, montagem: pedido.montagem, acompanhamentos: pedido.acompanhamentos }
        // pedidos.push(pedidoNovo);
        pedidos.push(pedido);
        baseConsulta[pedido.mesa]['pedidos'] = pedidos;
    }
};

app.get('/mesas', (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send(baseConsulta);
});

app.listen(4000, async () => {
    console.log('Consultas. Porta 4000.');
    const resp = await axios.get('http://192.168.0.11:1000/eventos');
    resp.data.forEach((valor, indice, colecao) => {
        try {
            funcoes[valor.tipo](valor.dados);
        } catch (e) { }
    });
});