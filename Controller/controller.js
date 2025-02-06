const { Op, where } = require('sequelize')
const {Comment, Post, Profile, Tag, User} = require('../models/index')
const {hashPassword, comparePassword} = require('../helper/bcyrpt')

class Controller {
    static async showHomepage (req,res){
        try {
            let {success} = req.query
            res.render('Homepage', {success})
        } catch (error) {
            res.send(error)
        }
    }
    static async showPosts (req,res){
        try {
            let {msg} = req.query
            let {search} = req.query
            let posts = await Post.getPostIncludingTagAndComment(Tag, Comment)
            if (search) {
                posts = await Post.findAll({
                        include: [
                        {model: Tag},  
                        {model: Comment}],
                        where: {
                            title:{
                                [Op.iLike]: `%${search}%`
                            }
                        }
                    })
            }
            res.render('showPost', {posts, msg})
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
                let isLoggedIn = comparePassword(password, user.password)
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
            let userId = req.session.userId
            let {title, content, TagId, imgUrl} = req.body
            await Post.create({
                title:title,
                content:content,
                imgUrl:imgUrl,
                TagId:TagId,
                UserId:userId
            })
            res.redirect('/posts')
        } catch (error) {
            res.send(error)
        }
    }
    static async deletePost (req,res){
        try {
            let {id} = req.params
            await Post.destroy({
                where: {id:id}
            })
            res.redirect('/posts')
        } catch (error) {
            res.send(error)
        }
    }
    static async showEditPost (req,res){
        try {
            let {id} = req.params
            let data = await Post.findOne({where:{id:id}})
            let tags = await Tag.findAll()
            console.log(data);
            
            res.render('editPost', {data, tags})
        } catch (error) {
            res.send(error)
        }
    }
    static async postEditForm (req,res){
        try {
            let {id} = req.params
            let {title, content, TagId, imgUrl} = req.body
            
            await Post.update({
                title:title,
                content:content,
                imgUrl:imgUrl,
                TagId:TagId},{
                    where: {id}
            })
            res.redirect('/posts')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports= Controller