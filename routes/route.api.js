var express = require('express');
//import the schema files of mongodb
var PostModel = require('../models/post');

var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');
var router = express.Router();
// Get Posts page
/* router.get('/posts',(req,res,next)=>{
  res.json({"fruits":["苹果","香蕉","橘子"]});
}); */
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
      success: true,
      post
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

*/
router.post('/signup', (req, res, next) => {
  


});
module.exports = router;