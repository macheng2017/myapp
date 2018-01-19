'use strict';

var express = require('express');
var marked = require('marked'); //引入marked
var router = express.Router();
var PostModel = require("../models/post");
var auth = require('../middlewares/auth');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
// Get Posts page
router.get('/posts', function (req, res, next) {
  res.render("posts", {
    title: "你好!!"
  });
});
/* GET users listing. */
router.get('/user', function (req, res, next) {
  res.send('respond with a resource');
});

/*GET posts create page */
router.get('/posts/create', auth.adminRequired, function (req, res, next) {
  res.render("create", { title: "填写表单" });
});
/* GET posts show article page */

router.get('/posts/show/:id', function (req, res, next) {
  /*  var id = req.query.id; */
  var id = req.params.id;

  PostModel.findOne({ _id: id }, function (err, post) {
    // push the content and convert to markdown syntax 
    post.content = marked(post.content);
    res.render('show', { title: "文章详情 " + post.title, post: post });
  });
});
/* processing send the edit article request of client browser then response an HTML skeleton   */

router.get("/posts/edit/:id", function (req, res, next) {
  /*  var id = req.query.id; */
  var id = req.params.id;

  res.render('edit', { title: "编辑文章", id: id });
});

/* GET signup page.
 added the  route method for sigup  */
router.get("/signup", function (req, res, next) {
  res.render('signup');
});
/* GET signin page */
router.get("/signin", function (req, res, next) {
  res.render('signin');
});

module.exports = router;
//# sourceMappingURL=route.page.js.map