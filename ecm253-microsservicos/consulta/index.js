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
        const idNovoPedido = pedido.idPedido;
        delete pedido.idMesa;
        delete pedido.idPedido;
        const pedidos = BDconsulta[idMesaPedidoNovo]['pedidos'] || {};
        pedidos[idNovoPedido] = pedido;
        BDconsulta[idMesaPedidoNovo]['pedidos'] = pedidos;
    },
    PedidoEnviado: (pedidoAtualizado) => {
        const idMesaPedidoAtualizado = pedidoAtualizado.idMesa;
        const idPedidoAtualizado = pedidoAtualizado.idPedido;
        delete pedidoAtualizado.idMesa;
        delete pedidoAtualizado.idPedido;
        const pedidos = BDconsulta[idMesaPedidoAtualizado]['pedidos'] || {};
        pedidos[idPedidoAtualizado] = pedidoAtualizado;
        BDconsulta[idMesaPedidoNovo]['pedidos'] = pedidos;
    },
    AtualizarContaMesa: (contaMesa) => {
        BDconsulta[contaMesa.idMesa].valorConta = contaMesa.valorConta;
    },
    DefinirValorPedido: (valorPedido) => {
        BDconsulta[valorPedido.idMesa]['pedidos'][valorPedido.idPedido].valorPedido = valorPedido.valorPedido;
    },
    PedidoCanceladoConfirmado: (pedidoCancelado) => {
        delete BDconsulta[pedidoCancelado.idMesa]['pedidos'][pedidoCancelado.idPedido]
    },
    PedidoProntoConfirmado: (pedido) => {
        BDconsulta[pedido.idMesa]['pedidos'][pedido.idPedido].status = pedido.status;
    },
    MesaFechadaConfirmada: (mesaFechada) => {
        BDconsulta[mesaFechada.idMesa].status = mesaFechada.status;
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