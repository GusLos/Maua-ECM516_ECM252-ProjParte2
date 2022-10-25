const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
const date = new Date();
app.use(express.json());

// const mesas = {};
const BDmesas = [];


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
    const horaChegada = date.toLocaleTimeString()
    const status = 'Abrindo...'
    const novaMesa = {idMesa, mesa, horaChegada, status}
    BDmesas.push(novaMesa)
    await axios.post('http://localhost:1000/eventos', {
        tipo: 'MesaCriada',
        dados:  novaMesa
    });
    res.status(200).send({msg: 'Ok'});
});

app.post('/eventos', (req, res) => {
    try {
        console.log(req.body);
    } catch (e) { }
    res.status(200).send({ msg: 'ok' });
});

app.listen(2000, () => {
    console.log('Mesas. Porta 2000.');
});