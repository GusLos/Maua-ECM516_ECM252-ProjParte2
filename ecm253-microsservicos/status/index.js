const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

const funcoes = {
    PedidoCriado: (pedido) => {
        // console.log('Entrei para atualizar...')
        pedido.status = 'Na cozinha ...';
        axios.post('http://localhost:1000/eventos', {
            tipo: 'PedidoEnviado',
            dados: pedido
        });
    },
    MesaCriada: (mesa) => {
        mesa.status = 'Aberta...';
        axios.post('http://localhost:1000/eventos', {
            tipo: 'AtualizarMesa',
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