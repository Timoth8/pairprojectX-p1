const express = require('express')
const router = express.Router()
const Controller = require('./Controller/controller')


// define the home page route
router.use('/', Controller.showHomepage)

module.exports = router