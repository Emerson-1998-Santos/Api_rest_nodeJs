const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const app = express();
const ContatosController = require('../App/Controllers/ContatosController')
const  GrupoController = require('../app/Controllers/GrupoController')


app.use(helmet());
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', function (req, res) {
    res.send('Api rodando com sucesso!');
});

app.get('/contacts', ContatosController.getUsers)
app.get('/contact/:id', ContatosController.getUserById)
app.post('/contacts', ContatosController.createUser)
app.put('/contact/:id', ContatosController.updateUser)
app.delete('/contact/:id', ContatosController.deleteUser)


app.get('/groups', GrupoController.getGrupos)
app.get('/groups/:id', GrupoController.getGruposById)
app.post('/groups', GrupoController.createGrupos)
app.put('/group/:id', GrupoController.updateGrupos)
app.delete('/group/:id', GrupoController.deleteGrupos)

module.exports = app;