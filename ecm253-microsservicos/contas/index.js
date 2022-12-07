const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const precos = require('../../models/cardapio.json');
const tipoPedido = require('../../models/tipos-pedido.json');
app.use(express.json());
app.use(cors());

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
        valorPedido += precos[novoPedido.pedido];
        // console.log(`Indice = ${indiceMesaParaAdicionarPedido}`)
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
    },
    PedidoCanceladoConfirmado: (pedidoCancelado) => {
        const mesa = BDcontas.find(m => m.idMesa === pedidoCancelado.idMesa);
        const indiceMesaParaAdicionarPedido = BDcontas.indexOf(mesa);
        let valorRetirar = 0;
        if (pedidoCancelado.tipoPedido === tipoPedido.MONTAGEM) {
            valorRetirar += 5.00;
        }
        valorRetirar += precos[pedidoCancelado.pedido];
        if (indiceMesaParaAdicionarPedido > -1){
            const valorAntigo = BDcontas[indiceMesaParaAdicionarPedido].valorConta;
            const valorNovo =  valorAntigo - valorRetirar;
            BDcontas[indiceMesaParaAdicionarPedido].valorConta = valorNovo;
            axios.post('http://localhost:1000/eventos', {
                tipo: 'AtualizarContaMesa',
                dados: {
                    idMesa: pedidoCancelado.idMesa,
                    valorConta: valorNovo
                }
            });
        }
        else {
            console.log('Falha ao adicionar valor na conta da mesa. Mesa não encontrada.');
        }
    },
    MesaFechadaConfirmada: (mesaFechada) => {
        const quantidadeContas = BDcontas.length
        for (let i = 0; i < quantidadeContas; i++){
            const conta = BDcontas.shift()
            if(conta.idMesa !== mesaFechada.idMesa){
                BDcontas.push(conta)
            }
        }
    }
};

app.get('/mesas/contas', (req, res) => {
    res.status(200).send(BDcontas);
});

app.get('/mesas/contas/:idMesa', (req, res) => {
    const mesa = BDcontas.find(m => m.idMesa === req.params.idMesa);
    res.send(mesa);
})

app.post('/eventos', (req, res) => {
    try{
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({msg: 'OK'});
});

app.listen(6000, () => {
    console.log('Contas. Porta 6000.');
})