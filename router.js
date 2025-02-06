const express = require('express')
const router = express.Router()
const Controller = require('./Controller/controller')


// define the home page route
router.get('/', Controller.showHomepage)
router.get('/posts', Controller.showPosts)

module.exports = router