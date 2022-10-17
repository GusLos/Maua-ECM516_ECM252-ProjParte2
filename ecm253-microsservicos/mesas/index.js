const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

// const mesas = {};
const mesas = [];

const formatString = (mesa) => {
    // Função para deixar tudo lower case, e trocar espaço por -
    const mesaL = mesa.toLowerCase();
    const mesaFormated = mesaL.replaceAll(' ', '-');
    return mesaFormated;
};

app.get('/mesas', (req, res) => {
    res.send(mesas);
});

app.post('/mesas', async (req, res) => {
    // console.log(req.body);
    const mesa = formatString(req.body['mesa']);
    // console.log(mesa);
    // mesas[mesa] = {};
    mesas.push(mesa)
    await axios.post('http://192.168.0.11:1000/eventos', {
        tipo: 'MesaCriada',
        dados: {
            mesa
        },
    });
    res.status(201).send(mesas);
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