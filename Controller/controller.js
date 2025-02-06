const {comment, post, profile, tag, user} = require('../models/index')

class Controller {
    static async showHomepage (req,res){
        try {
            res.render('Homepage.ejs')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports= Controller