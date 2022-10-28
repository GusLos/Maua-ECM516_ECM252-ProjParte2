const express = require('express');
const app = express();
const axios = require('axios');
const precos = require('../../models/cardapio.json');
const tipoPedido = require('../../models/tipos-pedido.json');
app.use(express.json());

const BDcontas = [];

const funcoes = {
    MesaAberta: (novaMesa) => {
        const novaConta = { idMesa: novaMesa.idMesa, status: novaMesa.status, valorConta: 0 };
        BDcontas.push(novaConta);
        axios.post('http://localhost:1000/eventos', {
            tipo: 'AtualizarContaMesa',
            dados: novaConta
        })
    },
    PedidoEnviado: (novoPedido) => {
        const mesa = BDcontas.find(m => m.idMesa === novoPedido.idMesa);
        const indiceMesaParaAdicionarPedido = BDcontas.indexOf(mesa);
        let valorPedido = 0;
        if (novoPedido.tipoPedido === tipoPedido.MONTAGEM) {
            valorPedido += 5.00;
        }
        valorPedido += precos[novoPedido.pedido]
        console.log(`Indice = ${indiceMesaParaAdicionarPedido}`)
        if (indiceMesaParaAdicionarPedido > -1){
            const valorAntigo = BDcontas[indiceMesaParaAdicionarPedido].valorConta ;
            const valorNovo = valorPedido + valorAntigo;
            BDcontas[indiceMesaParaAdicionarPedido].valorConta = valorNovo;
            axios.post('http://localhost:1000/eventos', {
                tipo: 'AtualizarContaMesa',
                dados: {
                    idMesa: novoPedido.idMesa,
                    valorConta: valorNovo
                }
            });
        }
        else {
            console.log('Falha ao adicionar valor na conta da mesa. Mesa não encontrada.');
        }
        axios.post('http://localhost:1000/eventos', {
            tipo: 'DefinirValorPedido',
            dados: {
                idMesa: novoPedido.idMesa,
                idPedido: novoPedido.idPedido,
                valorPedido
            }
        })
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

app.listen(6000, () => {
    console.log('Contas. Porta 6000.');
})