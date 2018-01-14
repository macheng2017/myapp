var express = require('express');
//import the schema files of mongodb
var PostModel = require('../models/post');

var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');
/*  */
var router = express.Router();

/* POST posts save the article details  */
router.post("/posts", (req, res, next) => {
  var title = req.body.title;
  var content = req.body.content;
  //res.send({title,content})//


  //save those data to the database of mongodb
  var post = new PostModel();
  post.title = title;
  post.content = content;

  post.save(function (err, doc) {
    if (err) {
      next(err);
    } else {
      // save operate require return the saved data to client,  because follow operate require the data id.
      res.json({
        success: true,
        posts: doc
      });
    }
  });
});
/* GET posts article lists  */
router.get('/posts', (req, res, next) => {
  PostModel.find({}, {}, (err, posts) => {
    if (err) {
      /*   res.json({success:false}); */
      next(err); /* use app.js error-handling */
      return;
    }
    res.json({
      success: true,
      postsList: posts
    });
  });
});
/* GET one post get the single article by id */
router.get('/posts/:id', (req, res, next) => {

  //var id  = req.query.id;
  var id = req.params.id;

  PostModel.findById(id, (err, post) => {
    if (err) {
      /* res.json({success:false}) */
      next(err); /* use app.js error-handling */
      return;
    }
    res.json({
      success: true,post
    });
  });
});
/* PATCH edit post  edit article */
router.patch('/posts/:id', (req, res, next) => {
  // var id = req.body.id;
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({
    _id: id
  }, {
    title,
    content
  }, (err) => {
    if (err) {
      /*   res.json({success:false}); */
      next(err); /* use app.js error-handling */
    } else {
      res.json({
        success: true
      });
    }
  });

});
/* 
  POST signup user
*/
router.post('/signup', (req, res, next) => {
    var name = req.body.name;
    var pass =req.body.pass;
    var rePass = req.body.rePass;
    if(pass !== rePass){
        return next(new Error('两次输入的密码不对!'));
    }
var user = new UserModel();
user.name =name;
user.pass = bcrypt.hashSync(pass,10);
user.save((err)=>{
  if(err){
    next(err);
  }else{
    res.end();
  }
});

});

/* POST signin user */
router.post("/signin",(req,res,next)=>{
  var name = req.body.name || '';
  var pass = req.body.pass || '';

UserModel.findOne({name},(err,user)=>{
  if(err||!user){
    return next(new Error("用户不存在"));
  }else{
    var isOk = bcrypt.compareSync(pass,user.pass);
    if(!isOk){
        return next(new Error("密码不对"));
    }
    // why this is _id ?
    var authToken = user._id;
    //组装一个cookie  Constructs a cookie with a specified name and value
    var opts ={
        path:'/',
        maxAge:1000*60*60*24*30,//cookie 有效期30天
        signed:true,
        httpOnly:true
    };
    res.cookie(config.cookieName,authToken,opts);
    res.end();
  }
  });
});
module.exports = router;