const express = require('express')
const router = express.Router()
const Controller = require('./Controller/controller')


// define the home page route
router.get('/', Controller.showHomepage)
router.get('/posts', Controller.showPosts)
router.get('/regis', Controller.addUserOrRegister)
router.post('/regis', Controller.postAddUserOrRegister)
router.get('/delete/post', Controller.deletePost)
router.get('/delete/comment', Controller.deleteComment)

module.exports = router