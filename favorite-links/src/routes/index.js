const express = require('express')
const router = express.Router()   //requerimos express para crear las rutas

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router