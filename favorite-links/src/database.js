const mysql = require('mysql')
const { promisify } = require('util')     //modulo de node para dar soporte de promesas
const { database } = require('./keys')

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {

  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('DATABASE CONNECTION WAS CLOSED')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED')
    }
  }

  if (connection) connection.release()
  console.log('DB is Connected')
  return

})

pool.query = promisify(pool.query) //cada vez que haga una consulta voy a poder usar async await o promesas

module.exports = pool