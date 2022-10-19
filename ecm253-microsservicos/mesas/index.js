const express = require('express');
const app = express();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
const date = new Date();
app.use(express.json());

// const mesas = {};
const BDmesa = {};

const formatString = (mesa) => {
    // Função para deixar tudo lower case, e trocar espaço por -
    const mesaL = mesa.toLowerCase();
    const mesaFormated = mesaL.replaceAll(' ', '-');
    return mesaFormated;
};

app.get('/mesas', (req, res) => {
    res.send(BDmesa);
});

app.post('/mesas', async (req, res) => {
    // console.log(req.body);
    const idMesa = uuidv4();
    const mesa = formatString(req.body['mesa']);
    const horaChegada = date.toLocaleTimeString()
    // console.log(mesa);
    // mesas[mesa] = {};
    // mesas.push(mesa)
    BDmesa[idMesa] = {idLocalMesa: mesa, horaChegada}
    await axios.post('http://localhost:1000/eventos', {
        tipo: 'MesaCriada',
        dados: {
            idMesa,
            mesa,
            horaChegada
        },
    });
    res.status(201).send(BDmesa);
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