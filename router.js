const express = require('express')
const router = express.Router()
const Controller = require('./Controller/controller')
const session = require('express-session')

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
     }
  }))

// define the home page route
router.get('/', Controller.showHomepage)
router.get('/login', Controller.showLogin)
router.post('/login', Controller.postLogin)
router.get('/posts', Controller.showPosts)
router.get('/regis', Controller.showRegisterProfile)
router.post('/regis', Controller.postRegisterProfile)


let userLoggedIn = (req,res,next) => {
    if (!req.session.userId) {
        res.redirect(`/login?msg=Please login first!`)
    } else {
        next()
    }
}

let userIsAdmin = (req,res,next) => {
    if(req.session.role!=="admin") {
        res.redirect(`/posts?msg=Unfortunately, only admin can do that`)
    } else {
        next()
    }  
}

router.get('/post/add', userLoggedIn, userIsAdmin , Controller.showAddPost)
router.post('/post/add', userLoggedIn, Controller.postAddPost)
router.get('/regis/:id', Controller.addUserFromRegister)
router.post('/regis/:id', Controller.postUserFromRegister)
router.get('/delete/:id/post', userLoggedIn, Controller.deletePost)
router.get('/delete/:id/comment', userLoggedIn, Controller.deleteComment)

module.exports = router