const { Op } = require('sequelize')
const {Comment, Post, Profile, Tag, User} = require('../models/index')
const {hashPassword, comparePassword} = require('../helper/bcyrpt')

class Controller {
    static async showHomepage (req,res){
        try {
            res.render('Homepage.ejs')
        } catch (error) {
            res.send(error)
        }
    }
    static async showPosts (req,res){
        try {
            let posts = await Post.findAll({
                include: [
                {
                    model: Tag,
                },  
                {
                    model: Comment
                }]
            })
            res.render('showPost', {posts})
        } catch (error) {
            res.send(error)
        }
    }
    static async showRegisterProfile (req,res){
        try {
            res.render('signUp')
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegisterProfile (req,res){
        try {
            let {name, gender, bio, profilePicture, phoneNumber, bornDate} = req.body
            let data = await Profile.create(req.body)
            
            res.redirect(`/regis/${data.id}`)
        } catch (error) {
            res.send(error)
        }
    }
    static async addUserFromRegister (req,res){
        try {
            res.render('createAcc')
        } catch (error) {
            res.send(error)
        }
    }
    static async postUserFromRegister (req,res){
        try {
            let {id} = req.params
            let {username, email, password, role} = req.body
            await User.create({
                username:username,
                email:email,
                password:password,
                role:role,
                ProfileId:id
            })
            
            res.redirect(`/?success=Success create ${username}!`)
        } catch (error) {
            res.send(error)
        }
    }
    static async showLogin (req,res){
        try {
            res.render('login.ejs')
        } catch (error) {
            res.send(error)
        }
    }
    static async postLogin (req,res){
        try {
            let {username, password} = req.body

            let user = await User.findOne({
                where: {
                    "username":username
                }
            })

            if (user) {
                let isLoggedIn = comparePassword(user.password, hashPassword(password) )
                if (isLoggedIn) {
                    req.session.userId = user.id
                    req.session.role = user.role
                    if (req.session.role==="admin") {
                        req.session.isAdmin=true
                    }
                    res.redirect(`/posts`)
                } else {
                    res.redirect(`/login?msg=Incorrect username/password`)
                }
            } else {
                res.redirect(`/login?msg=Incorrect username/password`)
            }
        } catch (error) {
            res.send(error)
        }
    }
    static async showAddPost (req,res){
        try {
            res.render('formaddPost')
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddPost (req,res){
        try {
            res.send(`ini post form add Post`)
        } catch (error) {
            res.send(error)
        }
    }
    static async deletePost (req,res){
        try {
            res.send(`ini buat delete post`)
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteComment (req,res){
        try {
            res.send(`ini buat delete comment`)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports= Controller