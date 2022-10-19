const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());

const eventos = [];

app.post('/eventos', (req, res) => {
    console.log(req.body.tipo)
    if (req.body.tipo == "PedidoEnviado"){
        console.log(req.body.dados)
    }
    const evento = req.body;
    eventos.push(evento);
    // envia o evento para microserviço de mesas
    axios.post('http://localhost:2000/eventos', evento);
    // envia o evento para microserviço de pedidos
    axios.post('http://localhost:3000/eventos', evento);
    // envia o evento para microserviço de consulta
    axios.post('http://localhost:4000/eventos', evento);
    // envia o evento para microserviço de status
    axios.post('http://localhost:5000/eventos', evento);
    res.status(200);
});

app.get('/eventos', (req, res) => {
    res.send(eventos)
})

app.listen(1000, () => {
    console.log('Barramento de eventos. Porta 1000.')
})