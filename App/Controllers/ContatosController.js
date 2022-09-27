
const pool = require("../../config/database")
const md5 = require('md5')



const getUsers = (request, response) => {
    pool.query('SELECT * FROM contacts ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
         });
    
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('SELECT * FROM contacts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows)
        });
    
};

const createUser = (request, response) => {
    const { name, company, email, telefone, titulo, photo, groupId } = request.body
    const now = new Date()
    pool.query('INSERT INTO contacts(name,email,telefone,company,titulo,photo,created_time,updated_time,"groupId") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', [name, company, email, telefone, titulo, photo, now, now, groupId], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {  name, company, email, telefone, titulo, photo, groupId  } = request.body
    const now = new Date()
    pool.query(
        'UPDATE contacts SET name = $1, company = $2, email = $3, telefone = $4, titulo = $5, photo = $6, "groupId" = $7,  updated_time = $8 WHERE id = $9',
        [ name, company, email, telefone, titulo, photo, groupId, now, id],
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

    pool.query('DELETE FROM contacts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    });
};



module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }

