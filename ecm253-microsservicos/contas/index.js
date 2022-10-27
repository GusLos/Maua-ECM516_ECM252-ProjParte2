const express = require('express');
const app = express();
const axios = require('axios');
const precos = require('../../models/cardapio.json');
const tipoPedido = require('../../models/tipos-pedido.json');
app.use(express.json());

const BDcontas = [];

const funcoes = {
    MesaCriada: (novaMesa) => {
        const novaConta = { idMesa: novaMesa.idMesa, status: novaMesa.status, valorConta: 0 };
        BDcontas.push(novaConta);
    },
    MesaAberta: (mesaAtualizada) => {
        const mesaParaAtualizar = BDcontas.find(m => m.idMesa === mesaAtualizada.idMesa);
        const indiceMesaParaAtualizar = BDcontas.indexOf(mesaParaAtualizar);
        if (indiceMesaParaAtualizar > -1){
            BDcontas[indiceMesaParaAtualizar].status = mesaAtualizada.status
        }
        else {
            console.log('Falha ao atualizar status da mesa. Mesa não encontrada.')
        }
    },
    PedidoEnviado: (novoPedido) => {
        const mesa = BDcontas.find(m => m.idMesa === novoPedido.idMesa);
        const indiceMesaParaAdicionarPedido = BDcontas.indexOf(mesa);
        let valorPedido = 0;
        if (novoPedido.tipoPedido === tipoPedido.MONTAGEM) {
            valorPedido += 5.00;
        }
        valorPedido += precos[novoPedido.pedido]
        console.log(BDcontas[indiceMesaParaAdicionarPedido])
        console.log(indiceMesaParaAdicionarPedido)
        if (indiceMesaParaAdicionarPedido > -1){
            console.log('ENTREI......')
            const valorAntigo = BDcontas[indiceMesaParaAdicionarPedido].valorConta 
            BDcontas[indiceMesaParaAdicionarPedido].valorConta = valorPedido + valorAntigo;
        }
        else {
            console.log('Falha ao adicionar valor na conta da mesa. Mesa não encontrada.');
        }
     }
};

app.get('/mesas/contas', (req, res) => {
    res.status(200).send(BDcontas);
});

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({msg: 'OK'});
});

app.listen(7000, () => {
    console.log('Contas. Porta 7000.');
})