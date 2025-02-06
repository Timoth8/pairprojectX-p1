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
            let posts = await Post.findAll()
            res.render('showPost.ejs', {posts})
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports= Controller