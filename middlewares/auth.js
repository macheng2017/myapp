var config = require("../config");
var UserModel =require('../models/user');

function authUser(req,res,next){
    const authToken = req.signedCookies[config.cookieName]||'';
    res.locals.currentUser = null;

    if (authToken) {
        UserModel.findOne({_id:authToken},(req,user)=>{
            if (err) {
                next(); //why not is next(err)?
                //because this is not handling error , this just function with auth
            } else {
                res.locals.currentUser = user;
                next(); //why not is next(err)?
            }

        });        
    }else {
        next();
    }
}
module.exports = {authUser};