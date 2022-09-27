require('dotenv').config();

// const app = require('./app');
const app = require('./routes/routes');
const port = process.env.PORT;




app.get('/', function (req, res) {
    res.send('Api rodando com sucesso!');
});


app.listen(port, (err) => {
    if (err) console.log("Erro na configuração do servidor")
    console.log(`Aplicativo rodando na porta ${port}.`);
})