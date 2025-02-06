const {Comment, Post, Profile, Tag, User} = require('../models/index')

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
                include: Tag
            })
            res.render('showPost.ejs', {posts})
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
            res.send(`ini form regis`)
        } catch (error) {
            res.send(error)
        }
    }
    static async postUserFromRegister (req,res){
        try {
            res.send(`ini submit regis`)
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
            res.send(`logged in`)
        } catch (error) {
            res.send(error)
        }
    }
    static async showAddPost (req,res){
        try {
            res.send(`ini form add Post`)
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