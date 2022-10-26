const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
// const date = new Date();
const statusTipo = require('../../models/tipos-status.json');
app.use(express.json());

const BDmesas = [];

const funcoes = {
    MesaAberta: (mesa) => {
        const mesaParaAtualizar = BDmesas.find(m => m.idPedido === mesa.idMesa);
        const indiceMesaParaAtualizar = BDmesas.indexOf(mesaParaAtualizar);
        if (indiceMesaParaAtualizar > -1){
            BDmesas[indiceMesaParaAtualizar] = mesa;
        }
        else{
            console.log('Falha ao atualizar mesa. Mesa não existe.');
        }
    }
}

const formatString = (mesa) => {
    const nomeMesaLocal = mesa.toLowerCase();
    const mesaFormated = nomeMesaLocal.replaceAll(' ', '-');
    return mesaFormated;
};

app.get('/mesas', (req, res) => {
    res.send(BDmesas);
});

app.post('/mesas', async (req, res) => {
    const idMesa = uuidv4();
    const mesa = formatString(req.body['mesa']);
    const date = new Date();
    const horaChegada = date.toLocaleTimeString();
    const status = statusTipo.ABRINDO_MESA;
    const novaMesa = {idMesa, mesa, horaChegada, status};
    BDmesas.push(novaMesa);
    await axios.post('http://localhost:1000/eventos', {
        tipo: 'MesaCriada',
        dados:  novaMesa
    });
    res.status(200).send({msg: 'Ok'});
});

app.post('/eventos', (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    } catch (e) { }
    res.status(200).send({ msg: 'ok' });
});

app.listen(2000, () => {
    console.log('Mesas. Porta 2000.');
});