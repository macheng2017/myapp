var config = require("../config");
var UserModel =require('../models/user');

function authUser(req,res,next){

    if (req.session && req.session.user) {
          const user  =req.session.user;
          res.locals.currentUser = user;
          next();     
    } else {

            const authToken = req.signedCookies[config.cookieName]||'';
            res.locals.currentUser = null;
        
            if (authToken) {
                UserModel.findOne({_id:authToken},(err,user)=>{
                    if (err || !user) {
                        next(); //why not is next(err)?
                        //because this is not handling error , this just function with auth
                    } else {
                        user = user.toObject();
                        user.isAdmin = user.loginname === config.admin;

                        req.session.user = user;
                        res.locals.currentUser = user;
                        next(); //why not is next(err)?
                    }
        
                });        
            }else {
                next();
            }
        }
    }
/* admin control auth middleware   */
function adminRequired(req,res,next){
    if (!req.session || !req.session.user) {
        
    } else {
        
    }

}
   
module.exports = {authUser};