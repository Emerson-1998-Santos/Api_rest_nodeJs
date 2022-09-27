const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const pool = require("./config/database")
const cors = require('cors')
const md5 = require('md5')


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const getUsers = (request, response) => {
    pool.query('SELECT * FROM sls_usuario ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({
            status: 'sucess',
            requestTime: request.requestTime,
            data: results.rows,
        });
    });
};

const getUserById = (req, res) => {
    const reqId = parseInt(req.params.id);
    pool.query('SELECT * FROM sls_usuario WHERE id = $1', [reqId], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({
            status: 'sucess',
            requestTime: req.requestTime,
            data: results.rows,
        });
    });
};

const createUser = (request, response) => {
    const { usuario_nome, usuario_email, usuario_senha } = request.body

    pool.query('INSERT INTO sls_usuario (usuario_nome, usuario_email, usuario_senha) VALUES ($1, $2, $3)', [usuario_nome, usuario_email, md5(usuario_senha),], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { usuario_nome, usuario_email, usuario_senha } = request.body

    pool.query(
        'UPDATE sls_usuario SET usuario_nome = $1, usuario_email = $2, usuario_senha = $3 WHERE id = $4',
        [usuario_nome, usuario_email, md5(usuario_senha), id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM sls_usuario WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};

const getlogin = (request, response) => {
    const { usuario_email, usuario_senha } = request.body
    const md5 = require('md5')
    pool.query('SELECT * FROM sls_usuario WHERE usuario_email = $1  AND  usuario_senha = $2', [usuario_email, md5(usuario_senha)], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
};








app.route("/usuarios").get(getUsers);
app.route('/usuario/:id').get(getUserById);
app.route('/usuario').get(createUser).post(createUser);
app.route('/usuario/:id').put(updateUser).delete(deleteUser);
// app.route('usuario/:id').delete(deleteUser);
app.route('/login').get(getlogin).post(getlogin);

module.exports = app;