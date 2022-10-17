const express = require('express');
const app = express();
app.use(express.json());

const funcoes = {
    PedidoCriado: (pedido) => {
        pedido.status = 'Na cozinha ...';
        axios.post('http://192.168.0.11:1000/eventos', {
            tipo: 'PedidoEnviado',
            dados: pedido
        });
    }
};

app.post('/eventos', (req, res) => {
    try {
        // 
    } catch (e) { }
    res.status(200).send({ msg: 'ok'});
});

app.listen(5000, () => {
    console.log('Status. Porta 5000.')
})