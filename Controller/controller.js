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
    static async addUserOrRegister (req,res){
        try {
            
            res.send(`ini form regis`)
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddUserOrRegister (req,res){
        try {
            res.send(`ini submit regis`)
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