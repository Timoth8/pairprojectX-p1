const express = require('express')
const router = express.Router()
const Controller = require('./Controller/controller')


// define the home page route
router.get('/', Controller.showHomepage)
router.get('/login', Controller.showLogin)
router.post('/login', Controller.postLogin)
router.get('/posts', Controller.showPosts)
router.get('/regis', Controller.addUserOrRegister)
router.post('/regis', Controller.postAddUserOrRegister)
router.get('/post/add', Controller.showAddPost)
router.post('/post/add', Controller.postAddPost)
router.get('/regis/:id')
router.post('/regis/:id')
router.get('/delete/:id/post', Controller.deletePost)
router.get('/delete/:id/comment', Controller.deleteComment)

module.exports = router