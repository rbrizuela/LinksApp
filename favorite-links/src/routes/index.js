const express = require('express')
const router = express.Router()   //requerimos express para crear las rutas

router.get('/', (req, res) => {
  res.send('hello world')
})

module.exports = router