
const pool = require("../../config/database")




const getGrupos = (request, response) => {
    pool.query('SELECT * FROM groups ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
     
      });
  };
  
  const getGruposById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM groups WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    });
  
  };
  
  const createGrupos = (request, response) => {
    const {name } = request.body
        const now = new Date()
    pool.query('INSERT INTO groups (name, created_time, updated_time) VALUES ($1, $2, $3)',[name, now, now], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Grupo adicionado com ID: ${results.insertid}`)
    });
  };
  
  const updateGrupos = (request, response) => {
    const id = parseInt(request.params.id)
    const {name} = request.body
    const now = new Date()
    pool.query(
      'UPDATE groups SET name = $1,  updated_time = $2 WHERE id = $3',
      [name, now, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Grupo modificado com ID: ${id}`)
      }
    )
  };
  
  const deleteGrupos = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM groups WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Grupo excluído com ID: ${id}`)
    });
  };


  module.exports = {
    getGrupos,
    getGruposById,
    createGrupos,
    updateGrupos,
    deleteGrupos,
  }
