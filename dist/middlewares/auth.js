'use strict';

var config = require("../config");
var UserModel = require('../models/user');

function authUser(req, res, next) {

    if (req.session && req.session.user) {
        var user = req.session.user;
        res.locals.currentUser = user;
        next();
    } else {
        var authToken = req.signedCookies[config.cookieName] || '';
        res.locals.currentUser = null;

        if (authToken) {
            UserModel.findOne({ _id: authToken }, function (err, user) {
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
        } else {
            next();
        }
    }
}
/* admin control auth middleware   */
function adminRequired(req, res, next) {
    if (!req.session || !req.session.user) {
        var err = new Error("需要登录!");
        err.status = 403;
        next(err);
        return;
    }
    if (!req.session.user.isAdmin) {
        var _err = new Error("需要管理员权限!");
        _err.status = 403;
        next(_err);
        return;
    }
    next();
}

module.exports = { authUser: authUser, adminRequired: adminRequired };
//# sourceMappingURL=auth.js.map